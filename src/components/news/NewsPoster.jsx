import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const NewsPoster = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current) return;

    // Use ScrollTrigger.matchMedia to run animation only on screens > 480px
    const mm = ScrollTrigger.matchMedia({
      // Screens larger than 480px
      "(min-width: 481px)": () => {
        const tl = gsap.fromTo(
          bgRef.current,
          { y: -100 },
          {
            y: 100,
            ease: "linear",
            scrollTrigger: {
              trigger: "#about_section",
              start: "top 5%",
              end: "bottom 50",
              scrub: true,
            },
          }
        );

        // Refresh ScrollTrigger after all images load
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
          images.forEach((img) => img.removeEventListener("load", handleImageLoad));
          tl.scrollTrigger?.kill();
        };
      },

      // Screens smaller than or equal to 480px
      "(max-width: 480px)": () => {
        // Do nothing or reset position
        gsap.set(bgRef.current, { y: 0 });
      },
    });

    return () => mm.revert(); // clean up matchMedia
  }, []);

  return (
    <div className="news_poster">
      <Image
        ref={bgRef}
        width={1000}
        height={1000}
        src="/images/news/news-banner.png"
        alt="contact-banner"
      />
    </div>
  );
};

export default NewsPoster;
