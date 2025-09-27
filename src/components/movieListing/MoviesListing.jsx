import React, { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Button from "../common/Button";
import Filters from "../common/Filters";
import Cursor from "../common/Cursor";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const MoviesListing = ({ data }) => {
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const filtersRef = useRef(null);
  const sectionRef = useRef(null);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredData =
    selectedFilter === "all"
      ? data
      : data.filter((movie) => movie.category === selectedFilter);

  useEffect(() => {
    const splits = [];
    const tl = gsap.timeline();

    const refs = [tagRef, titleRef];

    refs.forEach((ref) => {
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

      tl.to(lines, {
        yPercent: 0,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.03,
      });
    });

    // Animate Filters
    if (filtersRef.current) {
      tl.fromTo(
        filtersRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" },
        "-=0.4" // overlap with last line animation
      );
    }

    // Animate movie container
    if (sectionRef.current) {
      tl.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        "-=0.3" // overlap slightly with Filters animation
      );
    }

    return () => {
      splits.forEach((s) => s.revert());
      tl.kill();
    };
  }, [tagRef, titleRef, filtersRef, sectionRef]);

  const handleShowMore = () => {
    if (visibleCount < filteredData.length) {
      setVisibleCount(filteredData.length);
    } else {
      setVisibleCount(6);
    }
  };

  return (
    <section id="movie_listing" className="hero">
      <div className="movie_listing_header">
        <h5 ref={tagRef} className="tag landing_text">
          Movies
        </h5>
        <h3 ref={titleRef} className="heading landing_text">
          Explore our top <span className="letter-u">films</span> loved by{" "}
          <br /> <span className="letter-u">audiences</span> worldwide.
        </h3>
        <div ref={filtersRef} id="filter_wrap">
          <Filters
            filters={["all", "released", "upcoming movies"]}
            defaultFilter="all"
            onChange={(value) => {
              setSelectedFilter(value);
              setVisibleCount(6);
            }}
          />
        </div>
      </div>

      <div id="movie_container" className="hero" ref={sectionRef}>
        {filteredData.slice(0, visibleCount).map((movie, index) => (
          <MovieCard key={index} id={index + 1} data={movie} />
        ))}
      </div>

      {filteredData.length > 6 && (
        <div className="btn_container">
          <Button
            color={"black"}
            title={
              visibleCount < filteredData.length ? "show more" : "show less"
            }
            onClick={handleShowMore}
          />
        </div>
      )}

      <Cursor sectionRef={sectionRef} text="know more" />
    </section>
  );
};

export default MoviesListing;
