import axios from 'axios';
import { Product } from '@/types/Product';
import { PRODUCTS_API } from '@/constants/api';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(PRODUCTS_API);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ');
  }
};

// export const getProducts = async () => {
//   try {
//     const response = await axios.get(PRODUCTS_API);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };
