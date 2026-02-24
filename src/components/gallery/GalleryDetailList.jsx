import React, { useEffect, useRef, useState } from "react";
import GalleryDetailCard from "./GalleryDetailCard";
import GalleryFullView from "./GalleryFullView";
import gsap from "gsap";
import { useRouter } from "next/router";

const GalleryDetailList = ({ media }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const listRef = useRef(null);
  const router = useRouter();

  // ✅ Don't render anything if no media
  if (!media || media.length === 0) {
    return null;
  }

  useEffect(() => {
    if (!listRef.current) return;

    const tl = gsap.timeline();
    const cards = listRef.current.querySelectorAll(".gallery_detail_card");

    gsap.set(cards, { y: 80, opacity: 0 });
    tl.to(cards, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.05,
    });

    return () => tl.kill();
  }, []);

  const openFullView = (index) => setActiveIndex(index);
  const closeFullView = () => setActiveIndex(null);

  return (
    <>
      <div id="gallery_detail_list" ref={listRef}>
        {media?.map((item, index) => (
          <GalleryDetailCard
            key={index}
            index={index}
            item={item}
            cardClass="gallery_detail_card"
            onClick={() => openFullView(index)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <GalleryFullView
          data={media}
          activeIndex={activeIndex}
          onClose={closeFullView}
          setActiveIndex={setActiveIndex}
        />
      )}
    </>
  );
};

export default GalleryDetailList;
