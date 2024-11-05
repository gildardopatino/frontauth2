import React from 'react';

const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-content">
                <img src="/images/loading/bars.gif" alt="Loading..." />
            </div>
        </div>
    );
};

export default LoadingOverlay;