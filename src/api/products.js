import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost, apiPut, apiDelete } from './client';

const PRODUCTS_KEY = ['products'];

export function useProducts() {
  return useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: () => apiGet('/products'),
  });
}

export function useProduct(productId) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, productId],
    queryFn: () => apiGet(`/products/${productId}`),
    enabled: !!productId,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => apiPost('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => apiPut(`/products/${id}`, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: [...PRODUCTS_KEY, variables.id],
        });
      }
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiDelete(`/products/${id}`),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
      if (id) {
        queryClient.invalidateQueries({
          queryKey: [...PRODUCTS_KEY, id],
        });
      }
    },
  });
}


