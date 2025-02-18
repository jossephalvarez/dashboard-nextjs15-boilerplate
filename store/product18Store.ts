import { create } from 'zustand';
import { Product } from '@/types/Product';
import { getProducts } from '@/services/productService';

interface Product18Store {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProduct18Store = create<Product18Store>((set) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await getProducts();

      set({ products, loading: false });
    } catch (error) {
      set({ error: `${error}`, loading: false });
      console.error('Error:', error);
    }
  },
}));
