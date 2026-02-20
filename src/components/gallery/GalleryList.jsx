import React, { useEffect, useRef } from "react";
import GalleryCard from "./GalleryCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const GalleryList = ({ data, ishome }) => {
  const galleryRef = useRef(null);

  // Slice to 8 cards if ishome
  const displayData = ishome ? data?.slice(0, 8) : data;

  useEffect(() => {
    if (!galleryRef.current) return;

    const cards = galleryRef.current.querySelectorAll(".gallery_card");
    gsap.set(cards, { y: 80, opacity: 0 });

    const playAnimation = () => {
      return gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      });
    };

    // Check if already in view on load
    const rect = galleryRef.current.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    let st; // store ScrollTrigger instance

    if (inView) {
      playAnimation();
    } else {
      st = ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top 80%",
        onEnter: () => playAnimation(),
        once: true,
      });
    }

    return () => {
      if (st) st.kill();
    };
  }, [displayData]);

  return (
    <div id="gallery_list" ref={galleryRef}>
      {displayData.map((item) => (
        <GalleryCard key={item.slug} data={item} />
      ))}
    </div>
  );
};

export default GalleryList;
