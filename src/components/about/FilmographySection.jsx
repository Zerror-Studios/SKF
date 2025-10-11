import React, { useRef } from "react";
import { movies } from "@/helper/moviesData";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import FilmographyCard from "./FilmographyCard";

const FilmographySection = () => {
  const titleRef = useRef(null);

  useSplitTextMaskAnimation([titleRef]);

  return (
    <div id="filmography_section">
      <h2 ref={titleRef} className="heading">
        Filmography
      </h2>
      <div id="filmography_cards_wrap">
        {movies.map((film, index) => (
          <FilmographyCard film={film} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FilmographySection;
