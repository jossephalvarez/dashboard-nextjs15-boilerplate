import { create } from "zustand";
import { getUsers } from "@/services/userService";
import { useFetchData } from "@/hooks/useFetchData";
import { User } from "@/types/User";
import {useEffect} from "react";

interface UserStore {
    users: User[];
    loading: boolean;
    error: string | null;
    fetchUsers: () => void;
    updateUser: (id: number, newData: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    loading: false,
    error: null,
    fetchUsers: () => {}, // Lo definiremos dentro del hook

    updateUser: (id, newData) => {
        set((state) => ({
            users: state.users.map((user) =>
                user.id === id ? { ...user, ...newData } : user
            ),
        }));
    },
}));

// 📌 Custom hook para conectar Zustand con useFetchData
export const useUserData = () => {
    const { setState } = useUserStore;
    const { data, loading, error, refetch } = useFetchData<User[]>(getUsers);

    useEffect(() => {
        if (data) {
            setState({ users: data, loading, error });
        }
    }, [data, loading, error, setState]);

    return { loading, error, refetch };
};
