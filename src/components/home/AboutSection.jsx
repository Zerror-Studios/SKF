import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Button from "../common/Button";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = ({ data }) => {
  const bgRef = useRef(null);
  const router = useRouter();
  const words = data?.title?.split(" ") || [];

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
      },
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
        src={data?.backgroundImage}
        alt={data?.title}
        ref={bgRef}
      />
      <div id="about_section_over">
        <div id="about_section_title">
          <h2 className="heading">
            {words[0]}
            {words[1] && <span className="letter-u"> {words[1]} </span>}
            {words.slice(2).join(" ")}
          </h2>
        </div>
        <div id="about_section_info">
          {data?.description?.map((para, index) => (
            <p key={index} className="description">
              {para}
            </p>
          ))}
          <Button
            color="white"
            title="Show More"
            onClick={() => router.push("/about")}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
