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
import SeoHeader from "@/components/seo/SeoHeader";
import { galleryAlbums } from "@/helper/albumData";

const Home = ({ meta, movies, highlightsData, albums }) => {

  return (
    <>
      <SeoHeader meta={meta} />
      <HeroSection movies={movies} />
      <UpcomingBanner />
      <DirectorsSection />
      <Highlights tag={"Blogs"} title={<>Fresh <span className="letter-u">Stories</span></>} data={highlightsData} />
      <GalleryTitleSection subHeading={"GALLERY"} isPadding={true} />
      <GalleryList data={albums} />
      <AboutSection />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const meta = {
    title: "Salman Khan Films | Official Production House",
    description:
      "Salman Khan Films is an Indian film production company focused on producing high-quality Hindi cinema, delivering commercially successful and critically acclaimed motion pictures.",
    keywords:
      "Salman Khan Films, SKF, Bollywood production house, Hindi film production, Indian cinema, film studio India",
    author: "Salman Khan Films",
    robots: "index,follow",
  };

  const orderedTitles = [
    "Bajrangi Bhaijaan",
    "Dabangg 3",
    "Bharat",
  ];

  const latestMovies = orderedTitles
    .map(title => movies.find(movie => movie.title === title))
    .filter(Boolean);
  const highlightsData = news;
  const albums = galleryAlbums;


  return {
    props: {
      meta,
      movies: latestMovies,
      highlightsData,
      albums
    },
  };
}
