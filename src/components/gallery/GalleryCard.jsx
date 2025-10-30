import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const GalleryCard = ({ data }) => {

  return (
    <Link href={`/gallery/${data.slug}`}>
      <div className="gallery_card cursor-pointer landing_text">
        <div className="image1 image">
          {data?.galleryCover[0] && (
            <Image
              width={1000}
              height={1000}
              src={data?.galleryCover[0]}
              alt={data.title}
            />
          )}
        </div>
        <div className="image2 image">
          {data?.galleryCover[1] && (
            <Image
              width={1000}
              height={1000}
              src={data?.galleryCover[1]}
              alt={data.title}
            />
          )}
        </div>
        <div className="image3 image">
          {data?.galleryCover[2] && (
            <Image
              width={1000}
              height={1000}
              src={data?.galleryCover[2]}
              alt={data.title}
            />
          )}
        </div>
        <div className="card_details">
          <h2 className="heading">{data.title}</h2>
          <div className="arrow">
            <div className="arrow_circle">
              <GoArrowUpRight />
              <GoArrowUpRight />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;
