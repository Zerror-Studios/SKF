import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { movies } from "@/helper/moviesData";
import Image from "next/image";

const FilmographySection = () => {
  const imgRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeImg, setActiveImg] = useState(null);

  // cursor follow + show/hide logic
  useEffect(() => {
    const cursor = imgRef.current;
    const section = sectionRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", moveCursor);

    const handleEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
    };

    if (section) {
      section.addEventListener("mouseenter", handleEnter);
      section.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      if (section) {
        section.removeEventListener("mouseenter", handleEnter);
        section.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, []);

  // handle card hover -> animate image swap
  const handleCardEnter = (img) => {
    const cursorImg = imgRef.current.querySelector("img");

    if (cursorImg) {
      // animate old image out (scale up a bit)
      gsap.to(cursorImg, {
        scale: 1.1,
        duration: 0.4,
        ease: "linear",
        onComplete: () => {
          setActiveImg(img); // swap image after animation
        },
      });
    } else {
      setActiveImg(img);
    }
  };

  // animate new image in
  useEffect(() => {
    if (activeImg) {
      const cursorImg = imgRef.current.querySelector("img");
      if (cursorImg) {
        gsap.fromTo(
          cursorImg,
          { scale: 1,  },
          { scale: 1.1, duration: 0.4, ease: "linear" }
        );
      }
    }
  }, [activeImg]);

  return (
    <div id="filmography_section" ref={sectionRef}>
      {/* floating image that follows cursor */}
      <div id="filmograpy_img" ref={imgRef}>
        {activeImg && (
          <Image
            src={activeImg}
            alt="movie poster"
            width={400}
            height={600}
            priority
          />
        )}
      </div>

      <h2 className="heading">Filmography</h2>

      <div id="filmography_cards_wrap">
        {movies.map((film, index) => (
          <div
            className="filmography_card"
            key={index}
            onMouseEnter={() => handleCardEnter(film.poster)}
          >
            <div className="filmo_year">
              <h4 className="heading">{film.year}</h4>
            </div>
            <div className="filmo_info">
              <p className="description">{film.title}</p>
              <div className="filmo_director">
                <h5>Director</h5>
                <p className="description">{film.cast.join(", ")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmographySection;
