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

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 movies initially

  // Filtered movies based on category
  const filteredData =
    selectedFilter === "all"
      ? data
      : data.filter((movie) => movie.category === selectedFilter);

  const handleShowMore = () => {
    if (visibleCount < filteredData.length) {
      setVisibleCount(filteredData.length); // Show all movies
    } else {
      setVisibleCount(6); // Reset back to 6 movies
    }
  };

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
          onChange={(value) => {
            setSelectedFilter(value);
            setVisibleCount(6); // Reset visible count on filter change
          }}
        />
      </div>

      {/* Movie Container */}
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
