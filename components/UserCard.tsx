import React from "react";
import {UserCardProps} from "@/types/User";


const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
        </div>
    );
};

export default UserCard;
