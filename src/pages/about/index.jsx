import AboutHeroSection from "@/components/about/AboutHeroSection";
import FilmographySection from "@/components/about/FilmographySection";
import SeoHeader from "@/components/seo/SeoHeader";
import { movies } from "@/helper/moviesData";
import React from "react";

const About = ({ meta, moviesData }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <AboutHeroSection />
      <FilmographySection movies={moviesData} />
    </>
  );
};

export default About;

export async function getStaticProps() {
  const meta = {
    title: "About Us – Film Production House | Salman Khan Films",
    description:
      "Salman Khan Films is a Mumbai-based film production company established to create impactful cinema through strong storytelling and high production standards.",
    keywords:
      "About Salman Khan Films, SKF company profile, Bollywood film studio, Indian production house",
    author: "Salman Khan Films",
    robots: "index,follow",
  };

  const extraMovies = [
    {
      title: "Chillar Party",
      year: 2011,
      director: "Nitesh Tiwari, Vikas Bahl",
      category: "released",
    },
    {
      title: "Dr. Cabbie",
      year: 2014,
      director: "Jean-François Pouliot",
      category: "released",
    },
    {
      title: "Kaagaz",
      year: 2021,
      director: "Satish Kaushik",
      category: "released",
    },
  ];

  const moviesData = [...movies, ...extraMovies]
    .filter(
      (film) => !film.category.toLowerCase().includes("upcoming")
    )
    .sort((a, b) => b.year - a.year);

  return {
    props: {
      meta,
      moviesData,
    },
  };
}
