import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'TruthGuard - AI-Powered News Verification Platform',
  description = 'Verify news authenticity with AI-powered analysis. Detect fake news, analyze credibility, and stay informed with TruthGuard.',
  keywords = 'fake news detection, news verification, fact checking, AI analysis, credibility score, misinformation',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website'
}) => {
  const fullTitle = title.includes('TruthGuard') ? title : `${title} | TruthGuard`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="TruthGuard Team" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="TruthGuard" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@truthguard" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#7C3AED" />
      <meta name="msapplication-TileColor" content="#7C3AED" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "TruthGuard",
          "description": description,
          "url": url,
          "applicationCategory": "NewsApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "creator": {
            "@type": "Organization",
            "name": "TruthGuard Team"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;