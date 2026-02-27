import MoviesListing from "@/components/movieListing/MoviesListing";
import SeoHeader from "@/components/seo/SeoHeader";
import { client } from "@/sanity/lib/client";
import React from "react";

const Movies = ({ meta, movies }) => {

  return (
    <>
      <SeoHeader meta={meta} />
      <MoviesListing isHero={true} data={movies} />
    </>
  );
};

export default Movies;

export async function getStaticProps() {
  const meta = {
    title: "Films & Productions | Salman Khan Films",
    description:
      "Explore the complete list of films produced by Salman Khan Films, including released and upcoming titles.",
    keywords:
      "Salman Khan Films movies, SKF filmography, Hindi films, Bollywood productions, upcoming movies",
    author: "Salman Khan Films",
    robots: "index,follow",
  };

  // ✅ Fetch ALL movies (released + upcoming)
  const movies = await client.fetch(`
    *[_type == "movies"]
    | order(orderRank desc){
      title,
      year,
      category,
      "slug": slug.current,
      poster,
      "backgroundVideo": backgroundVideo.asset->url
    }
  `);

  return {
    props: {
      meta,
      movies,
    },
    revalidate: 60, // ISR
  };
}
