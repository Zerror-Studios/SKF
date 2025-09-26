import CastSection from "@/components/movieDetails/CastSection";
import HorizontalSlider from "@/components/common/HorizontalSlider/HorizontalSlider";
import MovieDetailsHero from "@/components/movieDetails/MovieDetailsHero";
import SynopsisSection from "@/components/movieDetails/SynopsisSection";
import HorizontalSwiper from "@/components/common/HorizontalSlider/HorizontalSwiper";
import { movies } from "@/helper/moviesData";
import React from "react";
import GallerySection from "@/components/common/GallerySection";

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
      <HorizontalSlider />
      <HorizontalSwiper />
      <GallerySection title={title} />
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
