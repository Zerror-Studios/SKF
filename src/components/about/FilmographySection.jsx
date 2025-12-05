import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import Button from "../common/Button";

gsap.registerPlugin(SplitText, ScrollTrigger);

const FilmographySection = ({ movies }) => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]); // store refs for all cards

  useSplitTextMaskAnimation([titleRef]);

  useGSAP(() => {
    const splits = [];

    const runAnimation = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const elements = card.querySelectorAll(
          ".heading, .description, .filmo_director h5"
        );

        elements.forEach((el) => {
          const split = new SplitText(el, {
            type: "lines",
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
              trigger: card,
              start: "top 90%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      ScrollTrigger.refresh();
    };

    // Wait for fonts and images before running animation
    const fontReady = document.fonts?.ready || Promise.resolve();
    const imagesReady = Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener("load", resolve);
              img.addEventListener("error", resolve);
            })
        )
    );

    Promise.all([fontReady, imagesReady]).then(() => {
      requestAnimationFrame(() => setTimeout(runAnimation, 50));
    });

    return () => {
      splits.forEach((s) => s.revert());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div id="filmography_section">
     <div className="filmography_title">
       <p className="tag1">Filmography</p>
      <h2 ref={titleRef} className="heading">
        Cinematic <span className="letter-u">Journey</span>
      </h2>
     </div>
      <div id="filmography_cards_wrap">
        {movies.map((film, index) => (
          <Link
            key={index}
            href={`/movies/${film.slug}`}
            className="filmography_card_link"
          >
            <div
              className="filmography_card"
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ overflow: "hidden" }}
            >
              <div className="filmo_year">
                <h4 className="heading">{film.year}</h4>
              </div>
              <div className="filmo_info">
                <p className="description">{film.title}</p>
                <div className="filmo_director">
                  <h5>Director</h5>
                  <p className="description">{film.director}</p>
                </div>
              </div>
                <Button title="Read More" color="black" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilmographySection;
