import GalleryDetailList from "@/components/gallery/GalleryDetailList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import { movies } from "@/helper/moviesData";
import React from "react";

const GalleryDetails = ({ media }) => {
  return (
    <>
      <GalleryTitleSection data={media} />
      <GalleryDetailList data={media} />
    </>
  );
};

export default GalleryDetails;

export async function getStaticPaths() {
  const paths = movies.map((movie) => ({
    params: { slug: movie.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const movie = movies.find((m) => m.slug === params.slug);

  return {
    props: {
      media: movie ? movie : [],
    },
  };
}
