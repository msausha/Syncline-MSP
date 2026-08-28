// src/components/SEO.jsx
// Drop this at the top of every route-level page component.
// It overrides the static <head> tags from index.html with tags
// specific to the current route, so each page gets its own
// title / description / canonical instead of inheriting the homepage's.
import React from 'react';
import { Helmet } from 'react-helmet-async';

// FIXED: apex domain, not www — must match the www→apex redirect in
// vercel.json. Canonical/OG tags pointing at www while www 301s away
// from itself would contradict the redirect and confuse crawlers.
const SITE_URL = 'https://syncline.com.au';
const DEFAULT_IMAGE = '/og-image.jpg';

export default function SEO({ title, description, path, image = DEFAULT_IMAGE, noindex = false }) {
  const url = `${SITE_URL}${path}`;
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
      {/* Twitter Card (harmless to include, helps link previews) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}