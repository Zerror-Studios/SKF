import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { movies } from "@/helper/moviesData";
import Image from "next/image";
import Link from "next/link";

const FilmographySection = () => {

  return (
    <div id="filmography_section" >
      <h2 className="heading">Filmography</h2>

      <div id="filmography_cards_wrap">
        {movies.map((film, index) => (
          <Link href={`/movies/${film.slug}`} className="filmography_card" key={index}>
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilmographySection;
