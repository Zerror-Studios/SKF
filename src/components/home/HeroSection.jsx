import React, { useRef, useEffect } from "react";
import HeroLoader from "./HeroLoader";
import MovieCard from "../movieListing/MovieCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ movies }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useSplitTextMaskAnimation([titleRef]);

  // Cards fade in from right initially
  useEffect(() => {
    if (window.innerWidth <= 480) return; // 🚫 skip animations on mobile

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { x: 1500, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  useGSAP(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 481px)": () => {
        if (!heroRef.current || cardsRef.current.length < 3) return;

        const card1 = cardsRef.current[0];
        const card2 = cardsRef.current[1];
        const card3 = cardsRef.current[2];

        const card2Rect = card2.getBoundingClientRect();
        const card1Rect = card1.getBoundingClientRect();
        const card3Rect = card3.getBoundingClientRect();

        const moveX1 = card2Rect.left - card1Rect.left;
        const moveX3 = card2Rect.right - card3Rect.right;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            scrub: 0.8,
          },
        });

        tl.to(
          [
            card1.querySelectorAll("span"),
            card2.querySelectorAll("span"),
            card3.querySelectorAll("span"),
          ],
          { opacity: 0, duration: 0.2,force3D: true },
          "cards"
        )
          .to(card1, { x: moveX1, zIndex: 1, force3D: true, duration: 1.2 })
          .to(card2, { zIndex: 2, force3D: true, duration: 1.2 }, "<")
          .to(
            card3,
            { x: moveX3, zIndex: 3, force3D: true, duration: 1.2 },
            "<"
          );
      },
    });
  }, []);

  return (
    <div id="hero_section_container" ref={heroRef}>
      <HeroLoader />
      <section id="movie_carousel_section">
        <div id="movie_carousel_content">
          <h5 className="tag">Movies</h5>
          <h3 ref={titleRef} className="heading">
            Explore our top <span className="letter-u">films</span> loved by <br /> <span className="letter-u"> audiences </span> worldwide.
          </h3>
          <div id="movie_carousel" className="grid grid-cols-3 gap-4">
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                id={index + 1}
                data={movie}
                ref={(el) => (cardsRef.current[index] = el)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
