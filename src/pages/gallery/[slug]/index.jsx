import GalleryDetailList from "@/components/gallery/GalleryDetailList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { galleryAlbums } from "@/helper/galleryData";
import { movies } from "@/helper/moviesData";
import React from "react";

const GalleryDetails = ({ media, aboutMovie }) => {
  return (
    <>
      <SeoHeader meta={media?.meta} />
      <GalleryTitleSection subHeading={"BTS"} data={media} />
      <GalleryDetailList data={media} aboutMovie={aboutMovie} />
    </>
  );
};

export default GalleryDetails;

export async function getStaticPaths() {
  // ✅ only include movies that actually have media
  const paths = galleryAlbums
    .filter((movie) => movie.media && movie.media.length > 0)
    .map((movie) => ({
      params: { slug: movie.slug },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const movie = galleryAlbums.find((m) => m.slug === params.slug);
  const aboutMovie = movies.find((m) => m.slug === params.slug);
  // ✅ handle invalid or empty media case safely
  if (!movie || !movie.media || movie.media.length === 0) {
    return {
      notFound: true, // tells Next.js to show 404
    };
  }

  return {
    props: {
      media: movie,
      aboutMovie,
    },
  };
}
