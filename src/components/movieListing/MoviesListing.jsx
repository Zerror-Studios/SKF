import React, { useRef, useState } from "react";
import MovieCard from "./MovieCard";
import Button from "../common/Button";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import Cursor from "../common/Cursor";
import Filters from "../common/Filters";

const MoviesListing = ({ data }) => {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  useSplitTextMaskAnimation([titleRef]);

  return (
    <section id="movie_listing" className="hero">
      <div className="movie_listing_header">
        <h5 className="tag">Movies</h5>
        <h3 ref={titleRef} className="heading">
          Explore our top <span className="letter-u">films</span> loved by{" "}
          <br /> <span className="letter-u">audiences</span> worldwide.
        </h3>
        <Filters
          filters={["all", "released", "upcoming movies"]}
          defaultFilter="all"
          onChange={(value) => console.log("Selected filter:", value)}
        />
      </div>

      {/* Movie Container */}
      <div id="movie_container" className="hero" ref={sectionRef}>
        {data.map((movie, index) => (
          <MovieCard key={index} id={index + 1} data={movie} />
        ))}
      </div>
      <div className="btn_container">
        <Button color={"black"} title={"show more"} />
      </div>
      <Cursor sectionRef={sectionRef} text="know more" />
    </section>
  );
};

export default MoviesListing;
