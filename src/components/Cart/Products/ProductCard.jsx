import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

const ProductCard = ({ id, title, price, category, description, image, onAddToCart }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                    <img src={image} className="card-img-top mt-2" alt={title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">Category: {category}</small></p>
                    <p className="card-text"><strong>{price}</strong></p>
                </div>
                <div className="card-footer text-muted">
                    <button className="btn btn-primary" onClick={() => onAddToCart({ id, title, price })}>
                        <FaCartPlus />
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;