import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useUserStore } from '@/store/userStore';
import UserList from '@/components/UserList';
import '@testing-library/jest-dom';

jest.mock('@/store/userStore');

describe('UserList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería mostrar "Cargando usuarios..." mientras se obtienen los datos', () => {
    const mockUseUserStore = useUserStore as unknown as jest.Mock;
    mockUseUserStore.mockReturnValue({
      users: [],
      loading: true,
      error: null,
      fetchUsers: jest.fn(),
      updateUser: jest.fn(),
    });

    render(<UserList />);
    expect(screen.getByText('🔄 Cargando usuarios...')).toBeInTheDocument();
  });

  it('debería mostrar un mensaje de error si la API falla', () => {
    const mockUseUserStore = useUserStore as unknown as jest.Mock;
    mockUseUserStore.mockReturnValue({
      users: [],
      loading: false,
      error: 'Error al obtener usuarios',
      fetchUsers: jest.fn(),
      updateUser: jest.fn(),
    });

    render(<UserList />);
    expect(
      screen.getByText('❌ Error al obtener usuarios')
    ).toBeInTheDocument();
  });

  it('debería mostrar la lista de usuarios cuando los datos están disponibles', async () => {
    const mockUseUserStore = useUserStore as unknown as jest.Mock;
    mockUseUserStore.mockReturnValue({
      users: [
        { id: 1, name: 'Juan' },
        { id: 2, name: 'Ana' },
      ],
      loading: false,
      error: null,
      fetchUsers: jest.fn(),
      updateUser: jest.fn(),
    });

    render(<UserList />);

    expect(screen.getByText('Lista de Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Juan')).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
  });

  it('debería filtrar los usuarios correctamente', async () => {
    const mockUseUserStore = useUserStore as unknown as jest.Mock;
    mockUseUserStore.mockReturnValue({
      users: [
        { id: 1, name: 'Juan' },
        { id: 2, name: 'Ana' },
      ],
      loading: false,
      error: null,
      fetchUsers: jest.fn(),
      updateUser: jest.fn(),
    });

    render(<UserList />);

    const input = screen.getByPlaceholderText('Filtrar usuarios...');
    fireEvent.change(input, { target: { value: 'Ana' } });

    await waitFor(() => {
      expect(screen.queryByText('Juan')).not.toBeInTheDocument();
      expect(screen.getByText('Ana')).toBeInTheDocument();
    });
  });

  it('debería llamar a updateUser al hacer clic en actualizar', async () => {
    const mockUpdateUser = jest.fn();
    const mockUseUserStore = useUserStore as unknown as jest.Mock;
    mockUseUserStore.mockReturnValue({
      users: [{ id: 1, name: 'Juan' }],
      loading: false,
      error: null,
      fetchUsers: jest.fn(),
      updateUser: mockUpdateUser,
    });

    render(<UserList />);

    const updateButton = screen.getByText('Actualizar');
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith(1, {
        name: 'Nombre Actualizado',
      });
    });
  });
});
