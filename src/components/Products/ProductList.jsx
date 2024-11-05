import React, { useEffect, useState, useContext } from 'react';
import ProductCard from './ProductCard';
import { CartContext } from '../contexts/CartContext';
import ProductListSkeleton from '../skeletons/ProductListSkeleton';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/product/list')
            .then(response => response.json())
            .then(data => {
                setProducts(data)
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error)
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <div className="row">
                {loading ? <ProductListSkeleton /> : (products.map(product => {
                    return (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            title={product.title}
                            price={product.price}
                            category={product.category}
                            description={product.description}
                            image={product.image}
                            onAddToCart={addToCart}
                        />
                    );
                }))}
            </div>
        </div>
    );
};

export default ProductList;