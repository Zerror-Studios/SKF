import Link from "next/link";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const FilmographyCard = ({ film, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const splits = [];

    const runAnimation = () => {
      if (!cardRef.current) return;

      const elements = cardRef.current.querySelectorAll(
        ".heading, .description, .filmo_director h5"
      );

      elements.forEach((el) => {
        const split = new SplitText(el, {
          type: "lines",
          mask: "lines",
          linesClass: "line",
        });
        splits.push(split);

        const lines = el.querySelectorAll(".line");

        gsap.set(lines, { yPercent: 100, opacity: 0 });
        gsap.to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
      });

      ScrollTrigger.refresh();
    };

    // Wait for fonts/layout
    const fontReady = document.fonts?.ready || Promise.resolve();
    fontReady.then(() => {
      requestAnimationFrame(() => {
        setTimeout(runAnimation, 50);
      });
    });

    return () => splits.forEach((s) => s.revert());
  }, []);

  return (
    <Link href={`/movies/${film.slug}`} className="filmography_card_link">
      <div className="filmography_card" ref={cardRef} style={{ overflow: "hidden" }}>
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
    </Link>
  );
};

export default FilmographyCard;
