// src/components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://syncline.com.au';   // ← changed to non-www

const DEFAULT_IMAGE = '/favicon-512.png';

export default function SEO({ 
  title, 
  description, 
  path = '/', 
  image = DEFAULT_IMAGE, 
  noindex = false 
}) {
  const url = path === '/' || path === '' 
    ? SITE_URL 
    : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Syncline IT Solutions" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}