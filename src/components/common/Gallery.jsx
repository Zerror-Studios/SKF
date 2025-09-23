import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import Button from "./Button";
import Filters from "./Filters";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const galleryRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 481px)": () => {
        const galleryContainer = galleryRef.current;
        const cols = [...galleryContainer.querySelectorAll(".col")];

        const setupAnimations = () => {
          const heights = cols.map((col) => col.offsetHeight);
          const maxHeight = Math.max(...heights);

          cols.forEach((col) => {
            const diff = maxHeight - col.offsetHeight;

            gsap.to(col, {
              y: diff,
              ease: "none",
              scrollTrigger: {
                trigger: galleryContainer,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
                markers: true,
              },
            });
          });

          // ✅ Refresh AFTER animations are created
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        };

        // Wait for images to load
        const images = galleryContainer.querySelectorAll("img");
        let loaded = 0;

        const checkDone = () => {
          loaded++;
          if (loaded === images.length) {
            setupAnimations();
          }
        };

        images.forEach((img) => {
          if (img.complete) {
            checkDone();
          } else {
            img.addEventListener("load", checkDone);
            img.addEventListener("error", checkDone); // in case of broken images
          }
        });
      },
    });
  }, []);

  // ✅ Array of images
  const images = [
    "/images/gallery/image1.png",
    "/images/gallery/image2.png",
    "/images/gallery/image3.png",
    "/images/gallery/image4.png",
    "/images/gallery/image5.png",
    "/images/gallery/image6.png",
    "/images/gallery/image7.jpg",
    "/images/gallery/image8.jpg",
    "/images/gallery/image9.jpg",
    "/images/gallery/image10.png",
    "/images/gallery/image11.png",
    "/images/gallery/image12.png",
    "/images/gallery/image13.png",
    "/images/gallery/image14.png",
    "/images/gallery/image15.png",
  ];

  // ✅ Divide images into columns (5, 4, 5)
  const columns = [
    images.slice(0, 5),
    images.slice(5, 10),
    images.slice(10, 15),
  ];

  return (
    <section id="gallery" className="gallery">
      <h2 className="heading">
        Raw, Real & BTS from <br /> Salman Khan Films
      </h2>
      <Filters
        filters={["all", "images", "videos"]}
        defaultFilter="all"
        onChange={(value) => console.log("Selected filter:", value)}
      />

      <div ref={galleryRef} className="gallery_container">
        {columns.map((colImages, colIndex) => (
          <div key={colIndex} className="col">
            {colImages.map((src, i) => (
              <Image
                key={i}
                width={500}
                height={500}
                src={src}
                alt={`gallery-${colIndex}-${i}`}
                priority
              />
            ))}
          </div>
        ))}
      </div>
      <div className="btn_container">
        <Button color={"black"} title={"show more"} />
      </div>
    </section>
  );
};

export default Gallery;
