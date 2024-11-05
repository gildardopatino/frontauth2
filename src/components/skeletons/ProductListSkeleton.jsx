import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductListSkeleton = () => {
    return (
        <div className='row'>
            {Array.from({ length: 6 }).map((_, index) => (
                <div className="col-md-4 mb-4" key={index}>
                    <div className="card h-100">
                        <div className="card-body">
                            <Skeleton height={150} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                            <Skeleton count={3} />
                        </div>
                        <div className="card-footer text-muted">
                            <Skeleton height={30} width={70} className="mb-3" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductListSkeleton
