'use client';
import React from 'react';
import { useParams } from 'next/navigation';

const ProductDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Product Detail {id}</h1>
    </div>
  );
};

export default ProductDetail;
