import { getUsers } from "@/services/userService";
import UserCard from "@/components/UserCard";
import {User} from "@/types/User";

export default async function Home() {
  // Aquí obtenemos los usuarios del servidor directamente
  const users = await getUsers();

  return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard de Usuarios</h1>
        <div className="grid grid-cols-3 gap-4">
          {users.map((user:User) => (
              <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
  );
}
