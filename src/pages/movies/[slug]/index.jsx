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
import SeoHeader from "@/components/seo/SeoHeader";

const MovieDetails = ({ movie, latestMovies, trailerList }) => {
  return (
    <>
      <SeoHeader meta={movie?.meta} />
      <MovieDetailsHero data={movie} />
      <SynopsisSection data={movie} />
      <CastSection data={movie} />
      <HorizontalSlider trailerList={trailerList} />
      <HorizontalSwiper data={movie} />
      {movie?.media && movie?.media.length > 0 && (
        <>
          <GalleryTitleSection
            data={movie}
            isPadding={true}
            subHeading={"BTS"}
          />
          <GalleryDetailList data={movie} />
        </>
      )}
      <MovieList
        movies={latestMovies}
        subheading="Other Movies"
        NotHero={true}
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
