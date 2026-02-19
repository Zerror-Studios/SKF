import MoviesListing from "@/components/movieListing/MoviesListing";
import SeoHeader from "@/components/seo/SeoHeader";
import { movies } from "@/helper/moviesData";
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
      "Explore the complete list of films produced by Salman Khan Films, including feature films, production details, and release information.",
    keywords:
      "Salman Khan Films movies, SKF filmography, Hindi films, Bollywood productions, Indian movies",
    author: "Salman Khan Films",
    robots: "index,follow",
  };
  return {
    props: {
      meta,
      movies,
    },
  };
}
