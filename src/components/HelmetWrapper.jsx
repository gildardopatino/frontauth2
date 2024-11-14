import React from 'react'
import { Helmet } from 'react-helmet';

const HelmetWrapper = ({ title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    </div>
  )
}

export default HelmetWrapper;
