import { Const } from "@/utils/Constant";
import React from "react";

const NewsArticleSchema = ({ news }) => {
  if (!news) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${Const.ClientLink}/news/${news.slug}#news`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${Const.ClientLink}/news/${news.slug}`,
    },
    headline: news.title,
    description: news.description,
    image: [`${Const.ClientLink}${news.image}`],
    datePublished: news.publishedAt,
    dateModified: news.updatedAt || news.publishedAt,
    author: {
      "@type": "Organization",
      name: "Salman Khan Films",
      url: Const.ClientLink,
    },
    publisher: {
      "@type": "Organization",
      name: "Salman Khan Films",
      logo: {
        "@type": "ImageObject",
        url: `${Const.ClientLink}/logo.png`,
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
