import React from "react";

const NewsArticleSchema = ({ news }) => {
  if (!news) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `https://salmankhanfilms.com/news/${news.slug}#news`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://salmankhanfilms.com/news/${news.slug}`,
    },
    headline: news.title,
    description: news.description,
    image: [`https://salmankhanfilms.com${news.image}`],
    datePublished: news.publishedAt,
    dateModified: news.updatedAt || news.publishedAt,
    author: {
      "@type": "Organization",
      name: "Salman Khan Films",
      url: "https://salmankhanfilms.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Salman Khan Films",
      logo: {
        "@type": "ImageObject",
        url: "https://salmankhanfilms.com/logo.png",
      },
    },
    articleSection: "Fresh Stories",
    inLanguage: "en-IN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
};

export default NewsArticleSchema;
