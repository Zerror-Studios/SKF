import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutPoster = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current) return;

    const mm = ScrollTrigger.matchMedia({
      // Screens larger than 480px
      "(min-width: 1024px)": () => {
        const tl = gsap.fromTo(
          bgRef.current,
          { y: -100 },
          {
            y: 100,
            ease: "linear",
            scrollTrigger: {
              trigger: "#about_section",
              start: "top 5%",
              end: "bottom -50%",
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
            ScrollTrigger.refresh();
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
          images.forEach((img) =>
            img.removeEventListener("load", handleImageLoad)
          );
          tl.scrollTrigger?.kill();
        };
      },

      // Screens smaller than or equal to 480px
      "(max-width: 480px)": () => {
        // Keep the image static
        gsap.set(bgRef.current, { y: 0 });
      },
    });

    return () => mm.revert(); // clean up matchMedia
  }, []);

  return (
    <div className="about_banner">
      <Image
        ref={bgRef}
        width={1000}
        height={1000}
        src="/images/about/about-banner.png"
        alt="about-banner"
        priority
      />
    </div>
  );
};

export default AboutPoster;
