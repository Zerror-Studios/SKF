import MoviesListing from "@/components/movieListing/MoviesListing";
import SeoHeader from "@/components/seo/SeoHeader";
import { getAllMovies } from "@/lib/queries";
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

  const movies = await getAllMovies();

  return {
    props: {
      meta,
      movies,
    },
    revalidate: 60,
  };
}
