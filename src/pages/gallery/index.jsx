import GalleryList from "@/components/gallery/GalleryList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import { movies } from "@/helper/moviesData";
import React from "react";

const Gallery = ({ media }) => {
  return (
    <>
      <GalleryTitleSection subHeading={"GALLERY"} />
      <GalleryList data={media} />
    </>
  );
};

export default Gallery;

export async function getStaticProps() {
    const media = movies.filter(
    (film) => !film.category.toLowerCase().includes("upcoming")
  );
  return {
    props: {
      media,
    },
  };
}
