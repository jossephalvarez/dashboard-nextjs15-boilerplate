import Link from 'next/link';
import ProductList from '@/app/product/page';

export default function Home() {
  return (
    <main>
      <h1>Bienvenido a la App</h1>
      <nav>
        <Link href="/users">Usuarios1</Link>
        <Link href="/users2">Usuarios2</Link>
        <Link href="/products">Productos</Link>
        <Link href="/products18">Productos</Link>
        <Link href="/post">PostList</Link>
      </nav>

      <ProductList></ProductList>
    </main>
  );
}
