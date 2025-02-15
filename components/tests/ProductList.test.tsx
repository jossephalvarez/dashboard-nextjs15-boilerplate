// ProductList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { useProductId } from '@/hooks/useProductId';
import ProductList from '@/components/ProductList'; // El hook que necesitamos mockear
import '@testing-library/jest-dom';

// Mockeamos el hook `useProductId` para simular diferentes estados.
jest.mock('@/hooks/useProductId');

describe('ProductList', () => {
  it('debería mostrar "loading" mientras se están cargando los datos', () => {
    // Mockeamos el hook para devolver el estado de carga.
    (useProductId as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<ProductList />);

    // Verificamos que se muestre el texto "....loading" cuando se está cargando.
    expect(screen.getByText('....loading')).toBeInTheDocument();
  });

  it('debería mostrar "error" si ocurre un error', () => {
    // Mockeamos el hook para devolver un error.
    (useProductId as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching data',
    });

    render(<ProductList />);

    // Verificamos que se muestre el texto "....error" si hay un error.
    expect(screen.getByText('....error')).toBeInTheDocument();
  });

  it('debería mostrar la lista de productos cuando los datos están disponibles', async () => {
    const mockUsers = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];

    // Mockeamos el hook para devolver los datos simulados de usuarios.
    (useProductId as jest.Mock).mockReturnValue({
      data: mockUsers,
      loading: false,
      error: null,
    });

    render(<ProductList />);

    // Esperamos que la lista de productos se renderice correctamente.
    await waitFor(() =>
      expect(
        screen.getByText('THIS IS A PRODUCT LIST COMPONENT: 2')
      ).toBeInTheDocument()
    );
  });
});
