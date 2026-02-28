import GalleryList from "@/components/gallery/GalleryList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { client } from "@/sanity/lib/client";
import React from "react";

const Album = ({ meta, albums }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <GalleryTitleSection subHeading={"GALLERY"} />
      <GalleryList data={albums} />
    </>
  );
};

export default Album;

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

  const albums = await client.fetch(`
  *[_type == "galleryAlbum"] | order(orderRank asc){
  title,
   "slug": slug.current,
  "cover": cover.asset->url,

  subAlbums[]{
    title,
     "slug": slug.current,
    "cover": cover.asset->url,

    media[]{
      type,
      "src": select(
        type == "image" => image.asset->url,
        type == "video" => videoUrl
      )
    }
  }
}`);

  return {
    props: {
      meta,
      albums,
    },
    revalidate: 60, // ISR
  };
}
