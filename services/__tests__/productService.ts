import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { getProducts } from '@/services/productService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Product Service', () => {
  it('debería obtener productos correctamente', async () => {
    const mockProducts = [{ id: 1, title: 'Test Product', price: 10 }];
    mockedAxios.get.mockResolvedValue({ data: mockProducts });

    const products = await getProducts();
    expect(products).toEqual(mockProducts);
  });

  it('debería manejar errores al obtener productos', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Error fetching'));

    await expect(getProducts()).rejects.toThrow('Error fetching');
  });
});
