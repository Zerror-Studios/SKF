import AboutSection from '@/components/home/AboutSection'
import DirectorsSection from '@/components/home/DirectorsSection'
import HeroSection from '@/components/home/HeroSection'
import Highlights from '@/components/home/Highlights'
import React from 'react'
import { movies } from '@/helper/moviesData'
import UpcomingBanner from '@/components/home/upcoming/UpcomingBanner'
import GalleryTitleSection from '@/components/gallery/GalleryTitleSection'
import GalleryDetailList from '@/components/gallery/GalleryDetailList'

const movie = {
  slug: "sikandar",
  year: 2025,
  title: "",
  cast: ["Salman Khan", "Rashmika Mandanna", "Sathyaraj", "Kajal Aggarwal", "Sharman Joshi"],
  director: "AR Murugadoss",
  poster: "/images/movie/sikandar.png",
  category: "upcoming movies",
  trailer: "/images/home/hero.mp4",
   media: [
      { type: "video", url: "/images/home/hero.mp4" },
      { type: "image", url: "/images/gallery/image7.jpg" },
      { type: "image", url: "/images/gallery/image2.png" },
      { type: "image", url: "/images/movie/sikandar.png" },
      { type: "image", url: "/images/movie/farrey.png" },
      { type: "image", url: "/images/movie/kiss-ka-bhai.png" },
      { type: "image", url: "/images/gallery/image15.png" },
      { type: "video", url: "/images/home/farrey.mp4" },
      { type: "image", url: "/images/movie/antim.png" },
      { type: "image", url: "/images/movie/radhe.png" },
      { type: "image", url: "/images/movie/kaagaz.png" },
      { type: "image", url: "/images/gallery/image1.png" },
      { type: "image", url: "/images/gallery/image3.png" },
      { type: "image", url: "/images/gallery/image4.png" },
      { type: "image", url: "/images/gallery/image5.png" },
      { type: "image", url: "/images/gallery/image6.png" },
      { type: "image", url: "/images/gallery/image14.png" },
      { type: "image", url: "/images/gallery/image12.png" },
      { type: "image", url: "/images/gallery/image13.png" },
    ]
}
const Home = ({ movies }) => {
  return (
    <>
      <HeroSection movies={movies} />
      <UpcomingBanner />
      <DirectorsSection />
      <Highlights tag={"highlight"} title={"News and Updates"} />
      <GalleryTitleSection data={movie} />
      <GalleryDetailList data={movie} />
      <AboutSection />
    </>
  )
}

export default Home;

export async function getStaticProps() {
  // Take only the last 3 movies
  const latestMovies = movies.slice(0, 3);
  return {
    props: {
      movies: latestMovies
    }
  };
}
