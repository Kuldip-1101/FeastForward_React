import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function PageSEO({ title, description }) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}