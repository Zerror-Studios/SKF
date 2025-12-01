import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
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
          start: "top bottom",
          end: "bottom+=100 top",
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
    <section id="about_section">
      <Image
        width={1000}
        height={1000}
        src="/images/home/about_bg.png"
        alt="image"
        ref={bgRef}
      />
      {/* Overlay Content */}
      <div className="about_overlay">
        <Image
          width={1000}
          height={1000}
          src="/images/home/about_banner.jpg"
          alt="image"
        />
        <div className="about_overlay_inner">
          <Image
            width={1000}
            height={1000}
            src="/images/home/about_banner.jpg"
            alt="image"
          />
          <div className="about_text_content">
            <h5 className="tag">about</h5>
            <h2 className="heading">
              Bringing Stories to Life,One Blockbuster at a Time
            </h2>
            <p className="description">
              Founded in 2011 by Salman Khan, Salman Khan Films (SKF) is a
              Mumbai-based production house behind critically acclaimed and
              loved films like Bajrangi Bhaijaan, Race 3, and Antim.
            </p>
            <p className="description">
              The company is known not only for delivering grand cinematic
              experiences but also for supporting fresh talent and innovative
              storytelling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
