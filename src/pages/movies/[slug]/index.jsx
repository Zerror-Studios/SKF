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
import { client } from "@/sanity/lib/client";

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
          <GalleryTitleSection
            title={movieTitle}
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
  const slugs = await client.fetch(`
    *[
      _type == "movies" &&
      category == "released" &&
      defined(slug.current)
    ].slug.current
  `);

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  if (!slug) {
    return { notFound: true };
  }

  const movie = await client.fetch(
    `
    *[
      _type == "movies" &&
      category == "released" &&
      slug.current == $slug
    ][0]{
      title,
      year,
      category,
      director,
      produced,
      synopsis,
      poster,
      cast,
      watchNow,
      trailer,
      teaser,
      meta,
      "backgroundVideo": backgroundVideo.asset->url,
      "slug": slug.current
    }
    `,
    { slug },
  );

  if (!movie) {
    return { notFound: true };
  }

  // other movies (also exclude null slugs)
  const latestMovies = await client.fetch(
    `
    *[
      _type == "movies" &&
      category == "released" &&
      defined(slug.current) &&
      slug.current != $slug
    ]
    | order(year desc)[0...3]{
      title,
      year,
      poster,
      "slug": slug.current
    }
    `,
    { slug },
  );

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

  return {
    props: {
      movie,
      latestMovies,
      trailerList,
      subAlbums: [],
      movieTitle: movie.title,
      movieSlug: movie.slug,
    },
    revalidate: 60,
  };
}
