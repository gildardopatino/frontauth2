import React from 'react'
import LazyLoad from 'react-lazyload'

const LazyImage = ({ src, alt, style, clase }) => {
    return (
        <LazyLoad>
            <img className={clase} src={src} alt={alt}  style={style} />
        </LazyLoad>
    )
}

export default LazyImage
