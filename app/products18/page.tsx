'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useProduct18Store } from '@/store/product18Store';
import Link from 'next/link';

const ProductList18 = () => {
  const { products, fetchProducts, loading, error } = useProduct18Store();

  useEffect(() => {
    fetchProducts();
  }, []);

  const [filter, setFilter] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  if (loading) return <p>...Loading</p>;
  if (error) return <p>...Error</p>;
  return (
    <div>
      <h1>PRODUCT LIST 18</h1>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Buscar producto..."
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <Link href={`/products18/${product.id}`}>
              {product.title} - ${product.price}
              <img alt={product.description} src={product.image} width="50" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList18;
