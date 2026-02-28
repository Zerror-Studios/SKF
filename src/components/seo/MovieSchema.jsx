import { Const } from "@/utils/Constant";
import React from "react";

const MovieSchema = ({ movie }) => {
  if (!movie) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "@id": `${Const.ClientLink}/movies/${movie.slug}#movie`,
    name: movie.title,
    url: `${Const.ClientLink}/movies/${movie.slug}`,
    image: `${Const.ClientLink}${movie.poster}`,
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
      url: Const.ClientLink,
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
          thumbnailUrl: `${Const.ClientLink}${movie.poster}`,
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
