import React, { useRef, useEffect } from "react";
import HeroLoader from "./HeroLoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MovieList from "./MovieList";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ movies }) => {
  const heroRef = useRef(null);


  return (
    <div id="hero_section_container" ref={heroRef}>
      <HeroLoader />
      <MovieList movies={movies} subheading={"Movies"}/>
    </div>
  );
};

export default HeroSection;
