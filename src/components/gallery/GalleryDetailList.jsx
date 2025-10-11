import React, { useEffect, useRef, useState } from "react";
import GalleryDetailCard from "./GalleryDetailCard";
import gsap from "gsap";

const GalleryDetailList = ({ data }) => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const listRef = useRef(null);

  const handlePlay = (index) => {
    setPlayingIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    if (!listRef.current) return;

    const tl = gsap.timeline();

    const cards = listRef.current.querySelectorAll(".gallery_detail_card");

    // Start below + hidden
    gsap.set(cards, { y: 80, opacity: 0 });

    // Animate in
    tl.to(cards, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.15, // delay between cards
    },"+=.6");

    return () => tl.kill();
  }, []);

  return (
    <div id="gallery_detail_list" ref={listRef}>
      {data?.media?.map((item, index) => {
        const patternIndex = index % 5;
        const cardClass =
          patternIndex === 0 || patternIndex === 1
            ? "gallery_detail_card_large"
            : "gallery_detail_card_small";

        return (
          <GalleryDetailCard
            key={index}
            index={index}
            item={item}
            cardClass={`gallery_detail_card ${cardClass}`}
            isPlaying={playingIndex === index}
            onPlay={() => handlePlay(index)}
          />
        );
      })}
    </div>
  );
};

export default GalleryDetailList;
