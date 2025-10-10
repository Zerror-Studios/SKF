import AboutSection from '@/components/home/AboutSection'
import DirectorsSection from '@/components/home/DirectorsSection'
import HeroSection from '@/components/home/HeroSection'
import Highlights from '@/components/home/Highlights'
import React from 'react'
import { movies } from '@/helper/moviesData'
import UpcomingBanner from '@/components/home/upcoming/UpcomingBanner'

const Home = ({ movies }) => {
  return (
    <>
      <HeroSection movies={movies} />
      <UpcomingBanner />
      <DirectorsSection />
      <Highlights tag={"highlight"} title={"News and Updates"} />
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
