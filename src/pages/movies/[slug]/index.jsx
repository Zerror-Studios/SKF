import React from "react";

import SeoHeader from "@/components/seo/SeoHeader";
import MovieDetailsHero from "@/components/movieDetails/MovieDetailsHero";
import SynopsisSection from "@/components/movieDetails/SynopsisSection";
import CastSection from "@/components/movieDetails/CastSection";

import HorizontalSlider from "@/components/common/HorizontalSlider/HorizontalSlider";
import HorizontalSwiper from "@/components/common/HorizontalSlider/HorizontalSwiper";

import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import GalleryDetailList from "@/components/gallery/GalleryDetailList";

import MovieList from "@/components/home/MovieList";

import { movies } from "@/helper/moviesData";
import { galleryAlbums } from "@/helper/galleryData";

const MovieDetails = ({ movie, galleryBts, latestMovies, trailerList }) => {
  if (!movie) return null;

  return (
    <>
      <SeoHeader meta={movie.meta} movie={movie} />

      <MovieDetailsHero data={movie} />
      <SynopsisSection data={movie} />
      <CastSection data={movie} />

      {trailerList.length > 0 && <HorizontalSlider trailerList={trailerList} />}

      <HorizontalSwiper data={movie} />

      {galleryBts?.media?.length > 0 && (
        <>
          <GalleryTitleSection data={galleryBts} subHeading="BTS" isPadding />
          <GalleryDetailList data={galleryBts} />
        </>
      )}

      {latestMovies.length > 0 && (
        <MovieList movies={latestMovies} subheading="Other Movies" NotHero />
      )}
    </>
  );
};

export default MovieDetails;

export async function getStaticPaths() {
  const paths = movies.map((movie) => ({
    params: { slug: movie.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const movie = movies.find((m) => m.slug === params.slug) || null;
  const galleryBts = galleryAlbums.find((g) => g.slug === params.slug) || null;

  const latestMovies = movies.filter((m) => m.slug !== params.slug).slice(0, 3);

  const trailerList = [
    movie?.trailer && {
      title: movie.title,
      url: movie.trailer,
      type: "trailer",
    },
    movie?.teaser && {
      title: movie.title,
      url: movie.teaser,
      type: "teaser",
    },
  ].filter(Boolean);

  return {
    props: {
      movie,
      galleryBts,
      latestMovies,
      trailerList,
    },
  };
}
