import React from 'react';
import { useProductId } from '@/hooks/useProductId';
import { USERS_API } from '@/constants/api';
import { User } from '@/types/User';

const ProductList = () => {
  const { data: users, loading, error } = useProductId<User[]>(USERS_API);

  if (loading) <p>....loading</p>;
  if (error) <p>....error</p>;
  if (!users) return null;

  return (
    <div>
      <h2>THIS IS A PRODUCT LIST COMPONENT: {users.length}</h2>
    </div>
  );
};

export default ProductList;
