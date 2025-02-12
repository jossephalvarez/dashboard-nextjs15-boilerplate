"use client"
import React, {useState, useMemo, useRef} from "react";
import {useUsers} from "@/hooks/useUsers";
import UserCard from "./UserCard";

const UserList: React.FC = () => {
    const {users, loading, error, handleUpdateUser} = useUsers();
    const [filter, setFilter] = useState("");

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [users, filter]);

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>{error}</p>;

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
