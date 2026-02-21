import React from "react";

const NewsArticleSchema = ({ article }) => {
  if (!article) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `https://skf-ten.vercel.app/news/${article.slug}#news`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://skf-ten.vercel.app/news/${article.slug}`,
    },
    headline: article.title,
    description: article.description,
    image: [
      `https://skf-ten.vercel.app${article.coverImage}`,
    ],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Salman Khan Films",
      url: "https://skf-ten.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Salman Khan Films",
      logo: {
        "@type": "ImageObject",
        url: "https://skf-ten.vercel.app/logo.png",
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