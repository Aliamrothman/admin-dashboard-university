import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useCreateProduct, useUpdateProduct, useProduct } from '../../api/products';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';

const productSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be a positive number')
    .required('Price is required'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
});

const defaultValues = {
  name: '',
  price: '',
  description: '',
};

const ProductForm = ({ mode = 'create', productId }) => {
  const navigate = useNavigate();
  const { colorTheme, colorThemes } = useStore();
  const currentTheme = colorThemes[colorTheme];

  const isEdit = mode === 'edit';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues,
  });

  const { data: existingProduct, isLoading: isLoadingProduct } = useProduct(
    isEdit ? productId : undefined,
  );

  useEffect(() => {
    if (isEdit && existingProduct) {
      reset({
        name: existingProduct.name ?? '',
        price: existingProduct.price ?? '',
        description: existingProduct.description ?? '',
      });
    }
  }, [existingProduct, isEdit, reset]);

  const {
    mutate: createProduct,
    isPending: isCreating,
  } = useCreateProduct();

  const {
    mutate: updateProduct,
    isPending: isUpdating,
  } = useUpdateProduct();

  const onSubmit = (values) => {
    const payload = {
      ...values,
      price: Number(values.price),
    };

    if (isEdit && productId) {
      updateProduct(
        { id: productId, data: payload },
        {
          onSuccess: () => {
            toast.success('Product updated successfully');
            navigate('/products');
          },
          onError: (error) => {
            toast.error(error.message || 'Failed to update product');
          },
        },
      );
    } else {
      createProduct(payload, {
        onSuccess: () => {
          toast.success('Product created successfully');
          navigate('/products');
        },
        onError: (error) => {
          toast.error(error.message || 'Failed to create product');
        },
      });
    }
  };

  const isSubmitting = isCreating || isUpdating;

  if (isEdit && isLoadingProduct) {
    return (
      <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
        <p className="text-gray-700 dark:text-gray-200">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700 max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {isEdit ? 'Edit Product' : 'Add Product'}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {isEdit
          ? 'Update the product details below.'
          : 'Fill in the details to create a new product.'}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Product name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register('price')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Write a detailed description of the product..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-200 text-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-md text-sm font-medium text-white shadow-sm flex items-center justify-center"
            style={{ backgroundColor: currentTheme.primary }}
          >
            {isSubmitting
              ? isEdit
                ? 'Saving...'
                : 'Creating...'
              : isEdit
              ? 'Save Changes'
              : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;


