import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from '@/app/product/page';
import { useProductStore } from '@/store/productStore';
jest.mock('@/store/productStore', () => ({
  useProductStore: jest.fn(),
}));

describe('ProductList Component', () => {
  it('debería mostrar productos y filtrar correctamente', async () => {
    (useProductStore as unknown as jest.Mock).mockReturnValue({
      products: [
        { id: 1, title: 'Laptop', price: 1000, image: 'laptop.jpg' },
        { id: 2, title: 'Mouse', price: 20, image: 'mouse.jpg' },
      ],
      fetch: jest.fn(),
    });

    render(<ProductList />);

    expect(screen.getByText('Laptop - $1000')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Buscar productos...'), {
      target: { value: 'Mouse' },
    });

    expect(screen.getByText('Mouse - $20')).toBeInTheDocument();
  });
});
