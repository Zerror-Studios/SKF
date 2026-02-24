import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const GalleryCard = ({ slug, title, cover }) => {
  return (
    <Link href={slug} style={{textDecoration:"none"}} className="gallery_wrap landing_text">
      <div className="gallery_card cursor-pointer ">
        {[1, 2, 3].map((num) => (
          <div key={num} className={`image${num} image`}>
            {cover && (
              <Image width={1000} height={1000} src={cover} alt={title} />
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
      <p className="tag" style={{marginTop:"1rem"}}>{title}</p>
    </Link>
  );
};

export default GalleryCard;
