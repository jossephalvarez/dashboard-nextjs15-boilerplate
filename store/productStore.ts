import { create } from 'zustand';
import { Product } from '@/types/Product';
import { getProducts } from '@/services/productService';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetch: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const products = await getProducts();
      set({ products, loading: false });
    } catch (error) {
      set({ error: `${error}`, loading: false });
    }
  },
}));
