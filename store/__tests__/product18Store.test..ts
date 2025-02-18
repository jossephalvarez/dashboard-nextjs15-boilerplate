import { act, renderHook } from '@testing-library/react';
import { useProductStore } from '@/store/productStore';
import { useProduct18Store } from '@/store/product18Store';

jest.mock('@/services/productService', () => ({
  getProducts: jest.fn().mockResolvedValue([
    { id: 1, title: 'Producto 1', image: '', price: 10 },
    { id: 2, title: 'Producto 2', image: '', price: 20 },
  ]),
}));

describe('Product Store', () => {
  it('debería cargar productos correctamente', async () => {
    const { result } = renderHook(() => useProduct18Store());

    await act(async () => {
      await result.current.fetchProducts();
    });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
