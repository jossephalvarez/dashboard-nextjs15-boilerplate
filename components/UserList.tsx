'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useUserStore } from '@/store/userStore';

export default function UserList() {
  const { users, fetchUsers } = useUserStore();
  const [filter, setFilter] = useState('');

  useMemo(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);

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
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
