import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList18 from '@/app/products18/page';
import { useProduct18Store } from '@/store/product18Store';

// (useProduct18Store as unknown as jest.Mock).mockResolvedValue({
//   roducts: [
//     { id: 1, title: 'Producto 1', image: '', price: 10 },
//     { id: 2, title: 'Producto 2', image: '', price: 20 },
//   ],
//   fetchProducts: jest.fn(),
//   loading: false,
//   error: null,
// });

jest.mock('@/store/product18Store', () => ({
  useProduct18Store: jest.fn(() => ({
    products: [
      { id: 1, title: 'Producto 1', image: '', price: 10 },
      { id: 2, title: 'Producto 2', image: '', price: 20 },
    ],
    fetchProducts: jest.fn(),
    loading: false,
    error: null,
  })),
}));

describe('ProductList Component', () => {
  it('debería renderizar la lista de productos', () => {
    render(<ProductList18 />);

    expect(screen.getByText('Producto 1 - $10')).toBeInTheDocument();
    expect(screen.getByText('Producto 2 - $20')).toBeInTheDocument();
  });

  it('debería filtrar productos', () => {
    render(<ProductList18 />);
    const input = screen.getByPlaceholderText('Buscar producto...');

    fireEvent.change(input, { target: { value: 'Producto 1' } });

    expect(screen.getByText('Producto 1 - $10')).toBeInTheDocument();
    expect(screen.queryByText('Producto 2 - $20')).not.toBeInTheDocument();
  });
});
