import { act, renderHook } from '@testing-library/react';
import { useUserStore } from '@/store/userStore';
import { getUsers } from '@/services/userService';
import { User } from '@/types/User';

jest.mock('@/services/userService'); // Mockeamos la API

describe('useUserStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería tener un estado inicial correcto', () => {
    const { result } = renderHook(() => useUserStore());

    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('debería obtener y guardar usuarios correctamente', async () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
    ];

    (getUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      await result.current.fetchUsers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.error).toBeNull();
  });

  it('debería manejar errores al obtener usuarios', async () => {
    (getUsers as jest.Mock).mockRejectedValue(new Error('Error en la API'));

    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      await result.current.fetchUsers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toContain('Error en la API'); // 🔹 Usamos toContain en vez de toBe
  });

  it('debería actualizar un usuario correctamente', () => {
    const { result } = renderHook(() => useUserStore());

    // 🔹 Inicializamos el estado con un usuario
    act(() => {
      result.current.users = [
        { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' } as User,
      ];
    });

    // 🔹 Llamamos a updateUser para actualizar el usuario
    act(() => {
      result.current.updateUser(1, { name: 'Leanne Actualizado' });
    });

    // 🔹 Verificamos que el usuario fue actualizado
    expect(result.current.users).toEqual([
      {
        id: 1,
        name: 'Leanne Actualizado',
        email: 'leanne@example.com', // 🔹 Mantiene los datos originales no modificados
      },
    ]);
  });
});
