import AboutSection from "@/components/home/AboutSection";
import DirectorsSection from "@/components/home/DirectorsSection";
import HeroSection from "@/components/home/HeroSection";
import Highlights from "@/components/home/Highlights";
import React, { useEffect, useState } from "react";
import { movies } from "@/helper/moviesData";
import UpcomingBanner from "@/components/home/upcoming/UpcomingBanner";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import { news } from "@/helper/newsData";
import GalleryList from "@/components/gallery/GalleryList";

const baseMovie = {
  slug: "bajrangi-bhaijaan",
  year: 2015,
  cast: ["Salman Khan", "Harshaali Malhotra", "Kareena Kapoor Khan", "Nawazuddin Siddiqui"],
  director: "Kabir Khan",
  poster: "/images/movie/bajrangi.png",
  category: "upcoming movies",
  trailer: "/images/home/hero.mp4",
  media: [
    { url: "https://www.youtube.com/watch?v=VXzUue3v20k" },
    { url: "https://www.youtube.com/watch?v=fpwmbYdJbQA" },
    { url: "https://www.youtube.com/watch?v=iTnNWLawjgo" },
    { url: "https://www.youtube.com/watch?v=1xOcQEa7bx0" },
    { url: "https://www.youtube.com/watch?v=yu7AHhrPbcY" },
    { url: "https://www.youtube.com/watch?v=jiQz6SIlw5M" },
    { url: "https://www.youtube.com/watch?v=siSXwyXtjiU" },
    { url: "https://www.youtube.com/watch?v=xsfvTLhOAGQ" },
    { url: "https://www.youtube.com/watch?v=QihJw8c0eCU" },
    { url: "https://www.youtube.com/watch?v=fn2bpVLUoJs" },
    { url: "https://www.youtube.com/watch?v=-W132TEnvZU" },
    { url: "https://www.youtube.com/watch?v=dWQkPeajgj8" },
    { url: "https://www.youtube.com/watch?v=Q1zTCmyoKig" },
    { url: "https://www.youtube.com/watch?v=YFbsvugPlVo" },
    { url: "https://www.youtube.com/watch?v=2-hTE4MhPuQ" },
    { url: "https://www.youtube.com/watch?v=HanwrCgOJ_A" },
    { url: "https://www.youtube.com/watch?v=YasKpC-Nag0" },
  ],
  galleryCover: [
    "/images/movie/farrey.png",
    "/images/movie/kiss-ka-bhai.png",
    "/images/movie/bajrangi.png",
  ]
};

const Home = ({ movies, highlightsData,media }) => {
  const [movie, setMovie] = useState(baseMovie);

  useEffect(() => {
    setMovie({
      ...baseMovie,
      media: baseMovie.media.slice(0, 8), // show first 8
    });
  }, []);


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
  const media = movies;
  return {
    props: {
      movies: latestMovies,
      highlightsData, media
    },
  };
}
