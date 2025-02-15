import React from 'react';
import {User} from "@/types/User";

export interface ProductListProps {
    user: User;
}

const ProductList = ({ user }: ProductListProps) => {
    return (
        <div>
            <h1>HOLA SOY PRODUCT LIST- {user.name}</h1>
        </div>
    );
};

export default ProductList;
