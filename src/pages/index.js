import AboutSection from "@/components/home/AboutSection";
import DirectorsSection from "@/components/home/DirectorsSection";
import HeroSection from "@/components/home/HeroSection";
import Highlights from "@/components/home/Highlights";
import React from "react";
import UpcomingBanner from "@/components/home/upcoming/UpcomingBanner";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import GalleryList from "@/components/gallery/GalleryList";
import SeoHeader from "@/components/seo/SeoHeader";
import { getBlogs, getDirectorSpotlight, getGalleryAlbums, getHeroSection, getHomeTopMovies, getUpcomingRelease } from "@/lib/queries";

const Home = ({ meta, heroSection, directorSpotlight, highlightsData, albums, upcomingRelease, homeTopMovie }) => {

  return (
    <>
      <SeoHeader meta={meta} />
      <HeroSection heroVideo={heroSection} movies={homeTopMovie} />
      <UpcomingBanner data={upcomingRelease} />
      <DirectorsSection directorSpotlight={directorSpotlight} />
      <Highlights
        tag={"Blogs"}
        title={<>Fresh <span className="letter-u">Stories</span></>}
        data={highlightsData}
      />
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

  const [
    heroSection,
    homeTopMovie,
    upcomingRelease,
    directorSpotlight,
    blogs,
    albums,
  ] = await Promise.all([
    getHeroSection(),
    getHomeTopMovies(),
    getUpcomingRelease(),
    getDirectorSpotlight(),
    getBlogs(),
    getGalleryAlbums(),
  ]);

  return {
    props: {
      meta,
      heroSection,
      homeTopMovie,
      directorSpotlight,
      highlightsData: blogs,
      albums,
      upcomingRelease,
    },
    revalidate: 10,
  };
}