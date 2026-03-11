"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const GalleryCard = ({ slug, title, cover }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Link
      href={slug}
      style={{ textDecoration: "none" }}
      className="gallery_wrap landing_text"
    >
      <div className="gallery_card cursor-pointer">
        {isMobile ? (
          <div className="image3 image">
            {cover && (
              <Image width={1000} height={1000} src={cover} alt={title} />
            )}
          </div>
        ) : (
          [1, 2, 3].map((num) => (
            <div key={num} className={`image${num} image`}>
              {cover && (
                <Image width={1000} height={1000} src={cover} alt={title} />
              )}
            </div>
          ))
        )}

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

      <div className="movie_dets" style={{ marginTop: "1rem", color: "#000" }}>
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default GalleryCard;