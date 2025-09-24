import AboutSection from '@/components/home/AboutSection'
import DirectorsSection from '@/components/home/DirectorsSection'
import Gallery from '@/components/common/Gallery'
import HeroSection from '@/components/home/HeroSection'
import Highlights from '@/components/home/Highlights'
import React from 'react'
import { movies } from '@/helper/moviesData'
import UpcomingSection from '@/components/home/UpcomingSection'

const Home = ({ movies }) => {
  const title = <> Raw, Real & BTS from <br /> Salman Khan Films</>
  return (
    <>
      <HeroSection movies={movies} />
      <UpcomingSection />
      <DirectorsSection />
      <Highlights />
      <Gallery title={title}/>
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
