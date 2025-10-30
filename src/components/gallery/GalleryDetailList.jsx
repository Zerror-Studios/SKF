import React, { useEffect, useRef, useState } from "react";
import GalleryDetailCard from "./GalleryDetailCard";
import GalleryFullView from "./GalleryFullView";
import gsap from "gsap";

const GalleryDetailList = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const listRef = useRef(null);

    // ✅ Don't render anything if no media
  if (!data?.media || data.media.length === 0) {
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
        {data?.media?.map((item, index) => (
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
          data={data.media}
          activeIndex={activeIndex}
          onClose={closeFullView}
          setActiveIndex={setActiveIndex}
        />
      )}
    </>
  );
};

export default GalleryDetailList;
