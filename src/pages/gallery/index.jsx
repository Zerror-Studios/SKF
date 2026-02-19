import GalleryList from "@/components/gallery/GalleryList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { movies } from "@/helper/moviesData";
import React from "react";

const Gallery = ({ meta, media }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <GalleryTitleSection subHeading={"GALLERY"} />
      <GalleryList data={media} />
    </>
  );
};

export default Gallery;

export async function getStaticProps() {
  const meta = {
    title: "Media Gallery | Salman Khan Films",
    description:
      "Official media gallery showcasing film stills, promotional material, and behind-the-scenes visuals from Salman Khan Films productions.",
    keywords:
      "Salman Khan Films gallery, SKF media, film stills, behind the scenes Bollywood",
    author: "Salman Khan Films",
    robots: "index,follow",
  };
  const media = movies.filter(
    (film) => !film.category.toLowerCase().includes("upcoming"),
  );
  return {
    props: {
      meta,
      media,
    },
  };
}
