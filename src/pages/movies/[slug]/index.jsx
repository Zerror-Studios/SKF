import Gallery from "@/components/common/Gallery";
import CastSection from "@/components/movieDetails/CastSection";
import HorizontalSlider from "@/components/movieDetails/HorizontalSlider";
import MovieDetailsHero from "@/components/movieDetails/MovieDetailsHero";
import SynopsisSection from "@/components/movieDetails/SynopsisSection";
import TrailerHeading from "@/components/movieDetails/TrailerHeading";
import TrailerSection from "@/components/movieDetails/TrailerSection";
import React from "react";

const MovieDetails = () => {
  return (
    <>
      <MovieDetailsHero />
      <SynopsisSection />
      <CastSection />
      <TrailerHeading />
      <HorizontalSlider />
      <TrailerSection/>
      <Gallery />
    </>
  );
};

export default MovieDetails;
