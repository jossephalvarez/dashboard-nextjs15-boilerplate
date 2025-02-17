import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Bienvenido a la App</h1>
      <nav>
        <Link href="/users">Usuarios1</Link>
        <Link href="/users2">Usuarios2</Link>
        <Link href="/products">Productos</Link>
      </nav>
    </main>
  );
}
