import { create } from 'zustand';
import { getUsers } from '@/services/userService';
import { User } from '@/types/User';

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>; // Ahora es una función async que devuelve una Promise
  updateUser: (id: number, newData: Partial<User>) => void;
}

// ✅ Versión optimizada de Zustand con la lógica de fetch dentro del store
export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,

  // ✅ Se integra la función fetchUsers directamente en el store
  fetchUsers: async () => {
    set({ loading: true, error: null }); // 🔹 Indicamos que está cargando

    try {
      const users = await getUsers(); // 🔹 Llamamos al servicio
      set({ users, loading: false }); // 🔹 Guardamos los usuarios en el estado
    } catch (error) {
      set({ error: `${error}`, loading: false }); // 🔹 Manejamos errores
    }
  },

  updateUser: (id, newData) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...newData } : user
      ),
    }));
  },
}));
