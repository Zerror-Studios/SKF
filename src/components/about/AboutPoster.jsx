import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const AboutPoster = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current) return;

    const tl = gsap.fromTo(
      bgRef.current,
      { y: "-20%" },
      {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: "#about_section",
          start: "top 5%",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Refresh ScrollTrigger after images in the section load
    const images = document.querySelectorAll("#about_section img");
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        ScrollTrigger.refresh(); // recalc positions
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    return () => {
      images.forEach((img) => img.removeEventListener("load", handleImageLoad));
      tl.scrollTrigger?.kill();
    };
  }, []);
  return (
    <div className="about_banner">
      <Image
        ref={bgRef}
        width={1000}
        height={1000}
        src="/images/about/about-banner.png"
        alt="contact-banner"
      />
    </div>
  );
};

export default AboutPoster;
