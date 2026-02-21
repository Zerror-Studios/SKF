import React from "react";

const OrganizationSchema = ({
  name,
  clientLink,
  logoUrl,
  address,
  contact,
  sameAs,
}) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: clientLink,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
    address: address
      ? {
          "@type": "PostalAddress",
          streetAddress: address.streetAddress,
          addressLocality: address.addressLocality,
          addressRegion: address.addressRegion,
          postalCode: address.postalCode,
        }
      : undefined,
    contactPoint: contact
      ? {
          "@type": "ContactPoint",
          telephone: contact.telephone,
          contactType: contact.contactType,
          areaServed: contact.areaServed,
          availableLanguage: contact.availableLanguage,
          hoursAvailable: contact.hoursAvailable
            ? {
                "@type": "OpeningHoursSpecification",
                opens: contact.hoursAvailable.opens,
                closes: contact.hoursAvailable.closes,
              }
            : undefined,
        }
      : undefined,
    sameAs,
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

export default OrganizationSchema;