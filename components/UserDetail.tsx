// "use client";
//
// import { useParams, useRouter } from "next/navigation";
// import { useFetchData } from "@/hooks/useFetchData";
// import { useUserStore } from "@/store/userStore";
// import { User } from "@/types/User";
// import { getUsersById } from "@/services/userService";
// import { useEffect, useMemo, useState } from "react";
//
// const UserDetailPage: React.FC = () => {
//     const { id } = useParams();  // Utilizamos useParams para obtener el id de la URL
//     const router = useRouter();
//     const { users } = useUserStore();
//     const [isUserFetched, setIsUserFetched] = useState(false);  // Nueva bandera
//
//     // 🔹 Busca el usuario en el store si ya fue cargado
//     const storedUser = useMemo(() => users.find((u) => u.id === Number(id)), [users, id]);
//
//     // 🔹 Si ya tenemos el usuario en store, evitamos la petición
//     const { data: user, loading, error } = useFetchData<User>(() => {
//         if (id && !storedUser && !isUserFetched) {
//             setIsUserFetched(true);  // Marca que ya se hizo la petición
//             return getUsersById(id).catch((err) => {
//                 console.error("Error al obtener el usuario:", err);
//                 throw new Error("No se pudo obtener el usuario");
//             });
//         } else {
//             return Promise.resolve(storedUser);  // Si ya existe en el store, no hacemos petición
//         }
//     });
//
//     // 🔹 Si no hay id, redirige a la página principal
//     useEffect(() => {
//         if (!id) {
//             router.push("/"); // 🔹 Redirige si no hay ID
//         }
//     }, [id, router]);
//
//     // 🔹 Si el usuario no se encuentra o hubo un error
//     if (loading) return <p>🔄 Cargando usuario...</p>;
//     if (error) return <p>❌ {error || "Hubo un problema al cargar el usuario."}</p>;
//     if (!user) return <p>❌ Usuario no encontrado o ID inválido.</p>;
//
//     return (
//         <div>
//             <h2>Detalles de {user?.name}</h2>
//             <p>Email: {user?.email}</p>
//             <p>Teléfono: {user?.phone}</p>
//             <p>Dirección: {user.address?.street}, {user.address?.city}</p>
//             <br/>
//             <h3>There are : {users?.length}</h3>
//             <button onClick={() => router.back()}>🔙 Volver</button>
//         </div>
//     );
// };
//
// export default UserDetailPage;



// app/users/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation'; // Usar useParams de next/navigation
import { User } from '@/types/User';
import {useUserStore} from "@/store/userStore";
import {useFetch} from "@/hooks/useFetch";
import {USERS_API} from "@/constants/api";
const UserDetailPage: React.FC = () => {
    const { id } = useParams();  // Utilizamos useParams para obtener el id de la URL
    // const { data: user, loading, error } = useFetch<User>(`${USERS_API}/${id}`);
    const { data: user } = useFetch<User>(`${USERS_API}/${id}`);



    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Detalles de {user?.name}</h2>
            <p>Email: {user?.email}</p>
            <p>Teléfono: {user?.phone}</p>
            <p>Dirección: {user.address?.street}, {user.address?.city}</p>
            <br/>
            {/*    TODO porque cuando refresco esto el store del numero de usuarios desaparece?*/}
        </div>
    );
};

export default UserDetailPage;
