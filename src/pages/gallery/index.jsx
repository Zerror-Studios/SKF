import React from "react";
import GalleryList from "@/components/gallery/GalleryList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { getGalleryAlbums } from "@/lib/gallery";
import { getContact } from "@/lib/contact";

const Album = ({ meta, albums }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <GalleryTitleSection subHeading="GALLERY" />
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

  const [albums, contact] = await Promise.all([
    getGalleryAlbums(),
    getContact(),
  ]);

  return {
    props: {
      meta,
      albums,
      contact,
    },
    revalidate: 60,
  };
}
