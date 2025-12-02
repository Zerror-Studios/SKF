import AboutSection from "@/components/home/AboutSection";
import DirectorsSection from "@/components/home/DirectorsSection";
import HeroSection from "@/components/home/HeroSection";
import Highlights from "@/components/home/Highlights";
import React from "react";
import { movies } from "@/helper/moviesData";
import UpcomingBanner from "@/components/home/upcoming/UpcomingBanner";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import { news } from "@/helper/newsData";
import GalleryList from "@/components/gallery/GalleryList";

const Home = ({ movies, highlightsData, media }) => {

  return (
    <>
      <HeroSection movies={movies} />
      <UpcomingBanner />
      <DirectorsSection />
      <Highlights tag={"highlight"} title={"News and Updates"} data={highlightsData} />
      <GalleryTitleSection isPadding={true} titlehero={true} />
      <GalleryList data={media} />
      <AboutSection />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const latestMovies = movies.slice(0, 3);
  const highlightsData = news;
  const media = movies.filter(
    (film) => !film.category.toLowerCase().includes("upcoming")
  ).slice(0, 8);
  return {
    props: {
      movies: latestMovies,
      highlightsData, media
    },
  };
}
