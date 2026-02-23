import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const GalleryCard = ({ data }) => {
  return (
    <Link href={`/gallery/${data.slug}`}>
      <div className="gallery_card cursor-pointer landing_text">
        {[1, 2, 3].map((num) => (
          <div key={num} className={`image${num} image`}>
            {data?.galleryCover && (
              <Image
                width={1000}
                height={1000}
                src={data.galleryCover}
                alt={data.title}
              />
            )}
          </div>
        ))}
        <div className="card_details">
          <h2 className="heading"></h2>
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
