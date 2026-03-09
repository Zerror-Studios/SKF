import React from "react";
import MoviesListing from "@/components/movieListing/MoviesListing";
import SeoHeader from "@/components/seo/SeoHeader";
import { getContact } from "@/lib/contact";
import { getAllMovies } from "@/lib/movies";


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

  const [movies, contact] = await Promise.all([getAllMovies(), getContact()]);

  return {
    props: {
      meta,
      movies,
      contact,
    },
    revalidate: 60,
  };
}
