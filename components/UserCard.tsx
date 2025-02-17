import React from 'react';
import Link from 'next/link';
import { User } from '@/types/User';

interface UserCardProps {
  user: User;
  onUpdate: () => void;
}

const UserCard = ({ user, onUpdate }: UserCardProps) => {
  return (
    <li>
      <strong>{user?.name}</strong>
      <strong>{user?.email}</strong>
      <button onClick={onUpdate}>Actualizar</button>
      <Link href={`/users/${user?.id}`}>Ver detalles</Link>
    </li>
  );
};

export default UserCard;
