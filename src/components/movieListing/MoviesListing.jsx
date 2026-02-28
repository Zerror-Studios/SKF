import React, { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Button from "../common/Button";
import Filters from "../common/Filters";
import Cursor from "../common/Cursor";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

const MoviesListing = ({ data }) => {
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const sectionRef = useRef(null);
  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredData =
    selectedFilter === "all"
      ? data
      : data.filter((movie) => movie.category === selectedFilter);

  useEffect(() => {
    const splits = [];
    const tl = gsap.timeline();

    const refs = [tagRef, titleRef];

    refs.forEach((ref, index) => {
      if (!ref?.current) return;

      const split = new SplitText(ref.current, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });
      splits.push(split);

      const lines = ref.current.querySelectorAll(".line");

      gsap.set(lines, { yPercent: 100 });
      gsap.set(ref.current, { opacity: 1 });
      tl.to(
        lines,
        {
          yPercent: 0,
          duration: 1.5,
          ease: "ease-secondary",
          stagger: { amount: 0.2 },
        },
        index === 0 ? 0 : "-=1.5"
      );
    });

    // Animate Filters
    if (filtersRef.current) {
      tl.fromTo(
        filtersRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 2, ease: "ease-secondary" },
        "-=1" // overlap with last line animation
      );
    }

    // Animate movie container
    if (sectionRef.current) {
      tl.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "ease-secondary" },
        "-=1.5" // overlap slightly with Filters animation
      );
    }

    return () => {
      splits.forEach((s) => s.revert());
      tl.kill();
    };
  }, [tagRef, titleRef, filtersRef, sectionRef]);

  return (
    <section id="movie_listing" className="hero">
      <div className="movie_listing_header">
        <h5 ref={tagRef} className="tag1 landing_text">
          Movies
        </h5>
        <h1 ref={titleRef} className="heading landing_text">
          Blockbuster <span className="letter-u">Lineup</span>
        </h1>
        <div ref={filtersRef} id="filter_wrap">
          <Filters
            filters={["all", "released", "upcoming"]}
            defaultFilter="all"
            onChange={(value) => {
              setSelectedFilter(value);
            }}
          />
        </div>
      </div>

      <div id="movie_container" className="hero" ref={sectionRef}>
        {filteredData?.map((movie, index) => (
          <MovieCard key={index} id={index + 1} data={movie} />
        ))}
      </div>

      <Cursor sectionRef={sectionRef} text="know more" />
    </section>
  );
};

export default MoviesListing;
