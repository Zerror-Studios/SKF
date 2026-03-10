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
import {
  getLatestMovies,
  getMovieBySlug,
  getMovieGallery,
  getMovieSlugs,
} from "@/lib/movieDetails";
import { getContact } from "@/lib/contact";

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
      {hasGallery && (
        <>
          <GalleryTitleSection
            title={movieTitle}
            isH2={true}
            subHeading="GALLERY"
            isPadding={true}
          />
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
  const slugs = await getMovieSlugs();

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, preview = false }) {
  const { slug } = params;

  if (!slug) {
    return { notFound: true };
  }

  const [movie, latestMovies, galleryData, contact] = await Promise.all([
    getMovieBySlug(slug, preview),
    getLatestMovies(slug),
    getMovieGallery(slug),
    getContact(),
  ]);

  if (!movie && !preview) {
    return { notFound: true };
  }
  const trailerList = [
    movie.trailer && {
      title: movie.title,
      url: movie.trailer,
      type: "trailer",
    },
    movie.teaser && {
      title: movie.title,
      url: movie.teaser,
      type: "teaser",
    },
  ].filter(Boolean);

  const subAlbums = galleryData?.subAlbums || [];

  return {
    props: {
      movie,
      latestMovies,
      trailerList,
      subAlbums,
      movieTitle: movie.title,
      movieSlug: movie.slug,
      contact,
    },
    revalidate: 60,
  };
}
