"use client"
import {useEffect, useMemo, useState} from "react";
import { useUserStore } from "@/store/userStore";
import UserCard from "@/components/UserCard";
import {User} from "@/types/User";

const UserList = () => {
    const { users, loading, error, fetchUsers, updateUser } = useUserStore();
    const [filter, setFilter] = useState("");

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [users, filter]);

    const handleUpdateUser = (id: number, newData: Partial<User>) => {
        updateUser(id, newData);
    };
    useEffect(() => {
        fetchUsers(); // 🔹 Llamamos la función directamente
    }, [fetchUsers]);

    if (loading) return <p>🔄 Cargando usuarios...</p>;
    if (error) return <p>❌ {error}</p>;

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <input
                type="text"
                placeholder="Filtrar usuarios..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <ul>
                {filteredUsers.map((user) => (
                    <UserCard
                        key={user.id} user={user}
                        onUpdate={() => handleUpdateUser(user.id, {name: "Nombre Actualizado"})}
                    />
                ))}
            </ul>
        </div>
    );
};


export default UserList;
