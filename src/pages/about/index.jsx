import AboutHeroSection from "@/components/about/AboutHeroSection";
import FilmographySection from "@/components/about/FilmographySection";
import { movies } from "@/helper/moviesData";
import React from "react";

const About = ({ moviesData }) => {
  return (
    <>
      <AboutHeroSection />
      <FilmographySection movies={moviesData} />
    </>
  );
};

export default About;

export async function getStaticProps() {
  const moviesData = movies.filter(
    (film) => !film.category.toLowerCase().includes("upcoming")
  );

  return {
    props: {
      moviesData,
    },
  };
}
