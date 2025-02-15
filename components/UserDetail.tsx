// app/users/[id]/page.tsx
'use client';
import { useParams, useRouter } from 'next/navigation'; // Usar useParams de next/navigation
import { User } from '@/types/User';
import { useFetch } from '@/hooks/useFetch';
import { USERS_API } from '@/constants/api';
import { useEffect } from 'react';
import ProductList from '@/components/ProductList';

const UserDetailPage = () => {
  const { id } = useParams(); // Utilizamos useParams para obtener el id de la URL
  // const { data: user } = useFetchData<User>(()=>getUsersById(id));
  const {
    data: user,
    loading,
    error,
  } = useFetch<User>(id ? `${USERS_API}/${id}` : '');
  const router = useRouter();

  // 🔹 Si no hay id, redirige a la página principal
  useEffect(() => {
    if (!id) {
      router.push('/'); // Redirige si no hay ID
    }
  }, [id, router]);

  if (!id) return <p>❌ ID no encontrado.</p>;
  if (loading) return <p>🔄 Cargando usuario...</p>;
  if (error)
    return <p>❌ {error || 'Hubo un problema al cargar el usuario.'}</p>;
  if (!user) return <p>❌ Usuario no encontrado o ID inválido.</p>;

  return (
    <div>
      <h2>Detalles de {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <p>Teléfono: {user?.phone}</p>
      <p>
        Dirección: {user.address?.street}, {user.address?.city}
      </p>
      <button onClick={() => router.back()}>🔙 Volver</button>
      <br />

      <ProductList user={user}></ProductList>
    </div>
  );
};

export default UserDetailPage;
