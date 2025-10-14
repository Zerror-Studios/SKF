import React, { useEffect, useRef, useState } from "react";
import { GrClose, GrNext, GrPrevious } from "react-icons/gr";
import gsap from "gsap";
import Image from "next/image";

const GalleryFullView = ({ data, activeIndex, setActiveIndex, onClose }) => {
  const [mediaKey, setMediaKey] = useState(0);
  const fullViewRef = useRef(null);
  const mediaRef = useRef(null);
  const activeItem = data?.[activeIndex];

  // === Open animation ===
  useEffect(() => {
    if (!fullViewRef.current) return;
    gsap.set(fullViewRef.current, { display: "flex" });
    gsap.fromTo(
      fullViewRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  // === Close animation ===
  const closeFullView = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
        gsap.set(fullViewRef.current, { display: "none" });
      },
    });
    tl.to(fullViewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  // === Fade media transition ===
  const fadeMedia = () => {
    if (!mediaRef.current) return;
    gsap.fromTo(
      mediaRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
    );
  };

  // Trigger fade animation on change
  useEffect(() => {
    if (activeItem) fadeMedia();
  }, [activeItem]);

  // === Navigation ===
  const handleNext = () => {
    setMediaKey((k) => k + 1);
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setMediaKey((k) => k + 1);
    setActiveIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  return (
    <div id="gallery_fullview" ref={fullViewRef}>
      <span id="close_view" onClick={closeFullView}>
        <GrClose />
      </span>

      <span className="prev_btn" onClick={handlePrev}>
        <GrPrevious />
      </span>

      <div id="preview_container">
        <div
          key={mediaKey}
          ref={mediaRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {activeItem?.type === "video" ? (
            <video src={activeItem.url} autoPlay controls playsInline />
          ) : (
            <Image
              src={activeItem.url}
              alt="preview"
              width={1000}
              height={1000}
            />
          )}
        </div>
      </div>

      <span className="next_btn" onClick={handleNext}>
        <GrNext />
      </span>
    </div>
  );
};

export default GalleryFullView;
