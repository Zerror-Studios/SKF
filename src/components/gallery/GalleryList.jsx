import React, { useEffect, useRef } from "react";
import GalleryCard from "./GalleryCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const GalleryList = ({ data, ishome }) => {
  const galleryRef = useRef(null);

  // Custom album order
  const albumOrder = [
    "Bajrangi Bhaijaan",
    "Dabangg 3",
    "Radhe: Your Most Wanted Bhai",
    "Tubelight",
    "Antim: The Final Truth",
  ];

  // Sort data according to album order
  const sortedData = [...data]
    .sort((a, b) => {
      const indexA = albumOrder.indexOf(a.title);
      const indexB = albumOrder.indexOf(b.title);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    })
    .filter((item) => item.media && item.media.length > 0);

  // Slice to 8 cards if ishome
  const displayData = ishome ? sortedData.slice(0, 8) : sortedData;

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
