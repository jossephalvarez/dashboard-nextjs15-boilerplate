import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserList from '@/components/UserList';
import { useUserStore } from '@/store/userStore';
import '@testing-library/jest-dom';

jest.mock('@/store/userStore');

describe('UserList Component', () => {
  const mockFetchUsers = jest.fn();

  beforeEach(() => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({
      users: [
        { id: 1, name: 'Juan Pérez' },
        { id: 2, name: 'María López' },
        { id: 3, name: 'Carlos García' },
      ],
      fetchUsers: mockFetchUsers,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería renderizar la lista de usuarios correctamente', async () => {
    render(<UserList />);

    // 📌 Verifica que el título se muestra
    expect(screen.getByText('Lista de Usuarios')).toBeInTheDocument();

    // 📌 Espera a que los usuarios se rendericen
    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
      expect(screen.getByText('María López')).toBeInTheDocument();
      expect(screen.getByText('Carlos García')).toBeInTheDocument();
    });
  });

  it('debería llamar a fetchUsers al montar el componente', () => {
    render(<UserList />);

    expect(mockFetchUsers).toHaveBeenCalledTimes(1); // 📌 Se llama al montar
  });

  it('debería filtrar la lista de usuarios correctamente', async () => {
    render(<UserList />);

    // 📌 Escribe en el input para filtrar
    fireEvent.change(screen.getByPlaceholderText('Filtrar usuarios...'), {
      target: { value: 'María' },
    });

    // 📌 Espera a que la lista filtrada se actualice
    await waitFor(() => {
      expect(screen.getByText('María López')).toBeInTheDocument();
      expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
      expect(screen.queryByText('Carlos García')).not.toBeInTheDocument();
    });
  });

  it('debería permitir la navegación con los enlaces de usuario', async () => {
    render(<UserList />);

    const link = screen.getByText('Juan Pérez');
    expect(link).toHaveAttribute('href', '/users/1');
  });
});
