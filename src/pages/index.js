import AboutSection from "@/components/home/AboutSection";
import DirectorsSection from "@/components/home/DirectorsSection";
import HeroSection from "@/components/home/HeroSection";
import Highlights from "@/components/home/Highlights";
import React from "react";
import UpcomingBanner from "@/components/home/upcoming/UpcomingBanner";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import GalleryList from "@/components/gallery/GalleryList";
import SeoHeader from "@/components/seo/SeoHeader";

import { galleryAlbums } from "@/helper/albumData";
import { client } from "@/sanity/lib/client";

const Home = ({ meta, movies, highlightsData, albums, upcomingRelease }) => {

  return (
    <>
      <SeoHeader meta={meta} />
      <HeroSection movies={movies} />
      <UpcomingBanner data={upcomingRelease} />
      <DirectorsSection />
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

  // 🎬 Latest movies (Sanity)
  const latestMovies = await client.fetch(`
    *[
      _type == "movies" &&
      category == "released" &&
      defined(slug.current)
    ]
    | order(orderRank asc)[0...3]{
      title,
      year,
      poster,
      category,
      "slug": slug.current,
      "backgroundVideo": backgroundVideo.asset->url
    }
  `);

  // 🎞 Upcoming banner
  const upcomingRelease = await client.fetch(`
    *[_type == "upcomingRelease"] | order(_createdAt desc)[0]{
      movieTitle,
      desktopBanner,
      mobileBanner
    }
  `);

  // 📰 Blogs for highlights
  const blogs = await client.fetch(`
    *[_type == "blog"] | order(publishedAt desc){
      "slug": slug.current,
      publishedAt,
      title,
      description,
      image
    }
  `);

  return {
    props: {
      meta,
      movies: latestMovies,        
      highlightsData: blogs,       
      albums: galleryAlbums,
      upcomingRelease,
    },
    revalidate: 60,
  };
}