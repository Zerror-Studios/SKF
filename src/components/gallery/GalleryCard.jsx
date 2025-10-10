import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const GalleryCard = ({ data }) => {
  // Get first 3 images from media
  const images = data.media.filter((m) => m.type === "image").slice(0, 3);

  return (
    <Link href={`/gallery/${data.slug}`}>
      <div className="gallery_card cursor-pointer">
        <div className="image1 image">
          {images[0] && (
            <Image
              width={1000}
              height={1000}
              src={images[0].url}
              alt={data.title}
            />
          )}
        </div>
        <div className="image2 image">
          {images[1] && (
            <Image
              width={1000}
              height={1000}
              src={images[1].url}
              alt={data.title}
            />
          )}
        </div>
        <div className="image3 image">
          {images[2] && (
            <Image
              width={1000}
              height={1000}
              src={images[2].url}
              alt={data.title}
            />
          )}
        </div>
        <div className="card_details">
          <h2 className="heading">{data.title}</h2>
          <div className="arrow">
            <div className="arrow_circle">
              <GoArrowUpRight />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;
