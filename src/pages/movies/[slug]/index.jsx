import CastSection from "@/components/movieDetails/CastSection";
import HorizontalSlider from "@/components/common/HorizontalSlider/HorizontalSlider";
import MovieDetailsHero from "@/components/movieDetails/MovieDetailsHero";
import SynopsisSection from "@/components/movieDetails/SynopsisSection";
import HorizontalSwiper from "@/components/common/HorizontalSlider/HorizontalSwiper";
import { movies } from "@/helper/moviesData";
import React from "react";
import GalleryDetailList from "@/components/gallery/GalleryDetailList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import MovieList from "@/components/home/MovieList";

const MovieDetails = ({ movie, latestMovies }) => {
  return (
    <>
      <MovieDetailsHero data={movie} />
      <SynopsisSection data={movie} />
      <CastSection data={movie} />
      <HorizontalSlider data={movie} />
      <HorizontalSwiper data={movie} />
      <GalleryTitleSection data={movie} isPadding={true} />
      <GalleryDetailList data={movie} />
      <MovieList
        movies={latestMovies}
        subheading={"Other Movies"}
        isHeor={false}
      />
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
  const latestMovies = movies.filter((m) => m.slug !== params.slug).slice(0, 3);

  return {
    props: { movie, latestMovies },
  };
}
