import { useEffect, useCallback } from "react";
import { useUserStore, useUserData } from "@/store/userStore";
import {User} from "@/types/User";

export const useUsers = () => {
    const { users, updateUser } = useUserStore();
    const { loading, error, refetch } = useUserData();

    useEffect(() => {
        if (users.length === 0) refetch();
    }, [refetch, users]);

    const handleUpdateUser = useCallback(
        (id: number, newData: Partial<User>) => {
            updateUser(id, newData);
        },
        [updateUser]
    );

    return { users, loading, error, handleUpdateUser };
};
