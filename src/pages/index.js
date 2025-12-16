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
      <Highlights tag={"News"} title={<>Fresh <span className="letter-u">Stories</span></>} data={highlightsData} />
      <GalleryTitleSection subHeading={"GALLERY"} isPadding={true} titlehero={true} />
      <GalleryList data={media} ishome={true} />
      <AboutSection />
    </>
  );
};

export default Home;

export async function getStaticProps() {
 const orderedTitles = [
  "Bajrangi Bhaijaan",
  "Dabangg 3",
  "Tubelight",
];

const latestMovies = orderedTitles
  .map(title => movies.find(movie => movie.title === title))
  .filter(Boolean);
  const highlightsData = news;
 const media = movies.filter(
  (film) =>
    !film.category.toLowerCase().includes("upcoming") &&
    film.title !== "Kisi Ka Bhai Kisi Ki Jaan"
);
  return {
    props: {
      movies: latestMovies,
      highlightsData, media
    },
  };
}
