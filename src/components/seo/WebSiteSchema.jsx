import React from "react";

const WebSiteSchema = ({ name, url }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: name,
    alternateName: "SKF",
    url: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export default WebSiteSchema;