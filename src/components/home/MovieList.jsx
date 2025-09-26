import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import MovieCard from "../movieListing/MovieCard";
import Button from "../common/Button";
import { useRouter } from "next/router";
gsap.registerPlugin(ScrollTrigger);

const MovieList = ({ movies }) => {
  const router = useRouter();
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  useSplitTextMaskAnimation([titleRef]);

  // Cards fade in from right initially
  useEffect(() => {
    if (window.innerWidth <= 480) return; //  skip animations on mobile

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

  return (
    <div id="movie_carousel_section">
      <div id="movie_header">
        <div id="movie_header_title">
          <h5 className="tag">Movies</h5>
          <h3 ref={titleRef} className="heading">
            Explore our top <span className="letter-u">films</span> loved by{" "}
            <br /> <span className="letter-u"> audiences </span> worldwide.
          </h3>
        </div>
        <Button
          color={"black"}
          title={"View all"}
          onClick={() => router.push("/movies")}
        />
      </div>
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
  );
};

export default MovieList;
