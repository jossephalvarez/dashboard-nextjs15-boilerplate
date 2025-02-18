import { Product } from '@/types/Product';
import { PRODUCTS_API } from '@/constants/api';
import axios from 'axios';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<[]>(PRODUCTS_API);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching ');
  }
};
