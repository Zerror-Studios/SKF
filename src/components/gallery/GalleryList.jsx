// pages/gallery.js
import React from "react";
import GalleryCard from "./GalleryCard";
import { movieGallery } from "@/helper/galleryData";

const GalleryList = () => {
  return (
    <div id="gallery_list" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {movieGallery.map((item) => (
        <GalleryCard key={item.slug} data={item} />
      ))}
    </div>
  );
};

export default GalleryList;
