import React, { useEffect, useState } from 'react'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [trm, setTrm] = useState(1);

    useEffect(() => {

        fetch('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => response.json())
            .then(data => {
                if (data && data.rates && data.rates.COP) {
                    setTrm(data.rates.COP)
                }
            });

        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className='container'>
            <div className="row">
                {products.map(product => {
                    const price = Math.round(product.price * trm);
                    return (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card h-100">
                                <div className="d-flex justify-content-center align-item-center" style={{ height: '200px' }}>
                                    <img className='card-img-top' src={product.image} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                                </div>
                                <div className="card-body">
                                    <h5>{product.title}</h5>
                                    <p className='card-text'>{product.description}</p>
                                    <p className='card-text'>$ {price}</p>
                                </div>
                                <div className="card-footer">
                                    <button className='btn btn-primary'>Agregar</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductList
