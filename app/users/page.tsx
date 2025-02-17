'use client';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

export default function UserList() {
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
