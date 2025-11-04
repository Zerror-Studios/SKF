import React, { useEffect, useRef } from "react";
import GalleryCard from "./GalleryCard";
import gsap from "gsap";

const GalleryList = ({ data }) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    const tl = gsap.timeline();

    const cards = galleryRef.current.querySelectorAll(".gallery_card");

    gsap.set(cards, { y: 80, opacity: 0 });

    tl.to(
      cards,
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15, // delay between cards
      },
      "+=.6"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div id="gallery_list" ref={galleryRef}>
      {data.map(
        (item) =>
          item.media &&
          item.media.length > 0 && <GalleryCard key={item.slug} data={item} />
      )}
    </div>
  );
};

export default GalleryList;
