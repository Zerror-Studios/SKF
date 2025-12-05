import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Button from "../common/Button";

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
        src="/images/home/about-poster.webp"
        alt="image"
        ref={bgRef}
      />
      <div id="about_section_over">
        <div id="about_section_title">
          <h2 className="heading">
            Bringing <span className="letter-u">Stories</span>
          </h2>
          <h2 className="heading">to Life</h2>
        </div>
        <div id="about_section_info">
          <p className="description">
            Founded in 2011 by Salman Khan, Salman Khan Films (SKF) is a
            Mumbai-based production house behind blockbusters like Bajrangi
            Bhaijaan, Race 3, and Antim. Known for powerful storytelling, grand
            entertainment.
          </p>
          <p className="description">
            The company is known not only for bringing grand cinematic
            experiences to the audience but also for supporting fresh talent and
            innovative storytelling.
          </p>
          <Button color="white" title="Show More" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
