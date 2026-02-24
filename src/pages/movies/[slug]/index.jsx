import React from "react";

import SeoHeader from "@/components/seo/SeoHeader";
import MovieDetailsHero from "@/components/movieDetails/MovieDetailsHero";
import SynopsisSection from "@/components/movieDetails/SynopsisSection";
import CastSection from "@/components/movieDetails/CastSection";

import HorizontalSlider from "@/components/common/HorizontalSlider/HorizontalSlider";
import HorizontalSwiper from "@/components/common/HorizontalSlider/HorizontalSwiper";

import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import GalleryList from "@/components/gallery/GalleryList";

import MovieList from "@/components/home/MovieList";

import { movies } from "@/helper/moviesData";
import { galleryAlbums } from "@/helper/albumData";

const MovieDetails = ({
  movie,
  latestMovies,
  trailerList,
  subAlbums,
  movieTitle,
  movieSlug,
}) => {
  if (!movie) return null;

  const hasGallery = subAlbums && subAlbums.length > 0;

  return (
    <>
      <SeoHeader meta={movie.meta} movie={movie} />

      <MovieDetailsHero data={movie} />
      <SynopsisSection data={movie} />
      <CastSection data={movie} />

      {trailerList.length > 0 && <HorizontalSlider trailerList={trailerList} />}

      <HorizontalSwiper data={movie} />

      {/* ✅ GALLERY SECTION (only if gallery exists) */}
      {hasGallery && (
        <>
          <GalleryTitleSection title={movieTitle} subHeading="GALLERY" isPadding={true} />
          <GalleryList data={subAlbums} movieSlug={movieSlug} />
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

  // ✅ Find gallery album ONLY if it exists
  const movieGallery =
    galleryAlbums.find((album) => album.slug === params.slug) || null;

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
      latestMovies,
      trailerList,
      subAlbums: movieGallery?.subAlbums || [],
      movieTitle: movieGallery?.title || null,
      movieSlug: movieGallery?.slug || null,
    },
  };
}
