import React from "react";

const MovieSchema = ({ movie }) => {
  if (!movie) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "@id": `https://skf-ten.vercel.app/movies/${movie.slug}#movie`,
    name: movie.title,
    url: `https://skf-ten.vercel.app/movies/${movie.slug}`,
    image: `https://skf-ten.vercel.app${movie.poster}`,
    description: movie.synopsis,
    datePublished: movie.year.toString(),
    inLanguage: "hi-IN",
    genre: "Hindi Feature Film",

    director: {
      "@type": "Person",
      name: movie.director,
    },

    productionCompany: {
      "@type": "Organization",
      name: "Salman Khan Films",
      url: "https://skf-ten.vercel.app",
    },

    actor: movie.cast?.map((actor) => ({
      "@type": "Person",
      name: actor.name,
    })),

    trailer: movie.trailer
      ? {
          "@type": "VideoObject",
          name: `${movie.title} Official Trailer`,
          embedUrl: movie.trailer,
          thumbnailUrl: `https://skf-ten.vercel.app${movie.poster}`,
        }
      : undefined,
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

export default MovieSchema;
