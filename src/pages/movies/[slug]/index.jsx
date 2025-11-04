import CastSection from "@/components/movieDetails/CastSection";
import HorizontalSlider from "@/components/common/HorizontalSlider/HorizontalSlider";
import MovieDetailsHero from "@/components/movieDetails/MovieDetailsHero";
import SynopsisSection from "@/components/movieDetails/SynopsisSection";
import HorizontalSwiper from "@/components/common/HorizontalSlider/HorizontalSwiper";
import { movies } from "@/helper/moviesData";
import React from "react";
import GalleryDetailList from "@/components/gallery/GalleryDetailList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";

const MovieDetails = ({ movie }) => {
  return (
    <>
      <MovieDetailsHero data={movie} />
      <SynopsisSection data={movie} />
      <CastSection data={movie} />
      <HorizontalSlider data={movie} />
      <HorizontalSwiper />
      <GalleryTitleSection data={movie} isPadding={true} />
      <GalleryDetailList data={movie} />
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
