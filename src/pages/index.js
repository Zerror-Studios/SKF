import AboutSection from "@/components/home/AboutSection";
import DirectorsSection from "@/components/home/DirectorsSection";
import HeroSection from "@/components/home/HeroSection";
import Highlights from "@/components/home/Highlights";
import React from "react";
import UpcomingBanner from "@/components/home/upcoming/UpcomingBanner";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import GalleryList from "@/components/gallery/GalleryList";
import SeoHeader from "@/components/seo/SeoHeader";
import { getDirectorSpotlight, getGalleryAlbums, getHeroSection, getHomeAbout, getHomeTopMovies, getUpcomingRelease } from "@/lib/queries";
import { getAllBlogs } from "@/lib/blog";
import { getContact } from "@/lib/contact";

const Home = ({ meta, heroSection, directorSpotlight, homeAbout, highlightsData, albums, upcomingRelease, homeTopMovie }) => {


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
      <AboutSection data={homeAbout} />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const meta = {
    title: "Salman Khan Films | Official Production House",
    description:
      "Salman Khan Films (SKF) is a Mumbai-based film production and distribution company founded in 2011 by Salman Khan, known for blockbuster films like Bajrangi Bhaijaan, Bharat, and Dabangg 3, delivering high-entertainment commercial cinema.",
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
    homeAbout,
    contact
  ] = await Promise.all([
    getHeroSection(),
    getHomeTopMovies(),
    getUpcomingRelease(),
    getDirectorSpotlight(),
    getAllBlogs(),
    getGalleryAlbums(),
    getHomeAbout(),
    getContact()
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
      homeAbout,
      contact
    },
    revalidate: 60,
  };
}