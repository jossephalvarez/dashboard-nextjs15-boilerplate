// ProductList.test.tsx
import { render, screen } from '@testing-library/react';
import { useProductId } from '@/hooks/useProductId';
import ProductList from '@/components/ProductList';
import '@testing-library/jest-dom';

jest.mock('@/hooks/useProductId'); // Mockeamos el hook

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reseteamos los mocks antes de cada test
  });

  it('debería mostrar "loading" mientras se están cargando los datos', () => {
    (useProductId as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<ProductList />);

    expect(screen.getByText('....loading')).toBeInTheDocument();
  });

  it('debería mostrar "error" si ocurre un error', () => {
    (useProductId as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching data',
    });

    render(<ProductList />);

    expect(screen.getByText('....error')).toBeInTheDocument();
  });

  it('debería mostrar la lista de productos cuando los datos están disponibles', async () => {
    const mockUsers = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];

    (useProductId as jest.Mock).mockReturnValue({
      data: mockUsers,
      loading: false,
      error: null,
    });

    render(<ProductList />);

    expect(
      await screen.findByText('THIS IS A PRODUCT LIST COMPONENT: 2')
    ).toBeInTheDocument();
    // expect(await screen.findByText('Product 1')).toBeInTheDocument();
    // expect(await screen.findByText('Product 2')).toBeInTheDocument();
  });
});
