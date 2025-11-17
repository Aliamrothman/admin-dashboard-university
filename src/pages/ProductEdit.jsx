import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/products/ProductForm';

const ProductEdit = () => {
  const { id } = useParams();
  return <ProductForm mode="edit" productId={id} />;
};

export default ProductEdit;


