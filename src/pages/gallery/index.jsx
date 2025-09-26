import GallerySection from "@/components/common/GallerySection";
import React from "react";

const Gallery = () => {
  const title = (
    <>
      {" "}
      Raw, Real & BTS from <br /> Salman Khan Films
    </>
  );
  return (
    <>
      <GallerySection title={title} ishero={true} />
    </>
  );
};

export default Gallery;
