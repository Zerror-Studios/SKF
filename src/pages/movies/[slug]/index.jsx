import Gallery from "@/components/common/Gallery";
import CastSection from "@/components/movieDetails/CastSection";
import HorizontalSlider from "@/components/movieDetails/HorizontalSlider";
import MovieDetailsHero from "@/components/movieDetails/MovieDetailsHero";
import SynopsisSection from "@/components/movieDetails/SynopsisSection";
import TrailerHeading from "@/components/movieDetails/TrailerHeading";
import TrailerSection from "@/components/movieDetails/TrailerSection";
import { movies } from "@/helper/moviesData";
import React from "react";

const MovieDetails = ({ movie }) => {
  const title = (
    <>
      Raw, Real & BTS from <br /> {movie?.title}
    </>
  );
  return (
    <>
      <MovieDetailsHero data={movie} />
      <SynopsisSection />
      <CastSection />
      <TrailerHeading />
      <HorizontalSlider />
      <TrailerSection />
      <Gallery title={title} />
    </>
  );
};

export default MovieDetails;

export async function getStaticPaths() {
  const paths = movies.map((movie) => ({
    params: { slug: movie.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const movie = movies.find((m) => m.slug === params.slug) || null;

  return {
    props: { movie },
  };
}
