'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import Link from 'next/link';

const ProductList = () => {
  const { products, fetch, loading, error } = useProductStore();

  useEffect(() => {
    fetch();
  }, []);

  const [filter, setFilter] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products...</div>;

  return (
    <div>
      <h2>Lista de Productos</h2>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} width="50" />
              <p>
                {product.title} - ${product.price}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
