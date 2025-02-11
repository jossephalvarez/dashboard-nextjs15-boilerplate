import React from "react";
import { useUsers } from "@/hooks/useUsers";
import UserCard from "./UserCard";

const UserList = () => {
    const { users, loading, error } = useUsers();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="grid grid-cols-3 gap-4">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UserList;
