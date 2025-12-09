import React from "react";
import CastSection from "@/components/movieDetails/CastSection";
import HorizontalSlider from "@/components/common/HorizontalSlider/HorizontalSlider";
import MovieDetailsHero from "@/components/movieDetails/MovieDetailsHero";
import SynopsisSection from "@/components/movieDetails/SynopsisSection";
import HorizontalSwiper from "@/components/common/HorizontalSlider/HorizontalSwiper";
import GalleryDetailList from "@/components/gallery/GalleryDetailList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import MovieList from "@/components/home/MovieList";
import { movies } from "@/helper/moviesData";

const MovieDetails = ({ movie, latestMovies, trailerList }) => {
  return (
    <>
      <MovieDetailsHero data={movie} />
      <SynopsisSection data={movie} />
      <CastSection data={movie} />
      <HorizontalSlider trailerList={trailerList} />
      <HorizontalSwiper data={movie} />
      <GalleryTitleSection data={movie} isPadding={true} />
      <GalleryDetailList data={movie} />
      <MovieList
        movies={latestMovies}
        subheading="Other Movies"
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

  // Redirect if upcoming movie
  if (movie?.category === "upcoming movie") {
    const movieSlug = movie.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-"); // spaces → dashes, lowercase

    return {
      redirect: {
        destination: `/movies/coming-soon?name=${movieSlug}`,
        permanent: false,
      },
    };
  }

  const latestMovies = movies.filter((m) => m.slug !== params.slug).slice(0, 3);
  const trailerList = [
    movie?.trailer
      ? { title: movie?.title, url: movie.trailer, type: "trailer" }
      : null,
    movie?.teaser
      ? { title: movie?.title, url: movie.teaser, type: "teaser" }
      : null,
  ].filter(Boolean);

  return {
    props: { movie, latestMovies, trailerList },
  };
}
