import React from "react";
import Link from "next/link";
import {User} from "@/types/User";

interface UserCardProps {
    user: User;
    onUpdate: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onUpdate }) => {
    return (
        <li>
            <strong>{user?.name}</strong> - {user?.email}
            <button onClick={onUpdate}>Actualizar</button>
            <Link href={`/users/${user?.id}`}>Ver detalles</Link>
        </li>
    );
};

export default UserCard;
