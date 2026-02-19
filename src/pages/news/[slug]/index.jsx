import Highlights from "@/components/home/Highlights";
import NewsHeroSection from "@/components/news/NewsHeroSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { news } from "@/helper/newsData";
import React from "react";

const News = ({ newsData, highlightsData }) => {
  return (
    <>
      <SeoHeader meta={newsData?.meta} />
      <NewsHeroSection data={newsData} />
      <Highlights tag={"More Highlights"} data={highlightsData} />
    </>
  );
};

export default News;

export async function getStaticPaths() {
  const paths = news.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const newsData = news.find((item) => item.slug === params.slug);
  const highlightsData = news;

  return {
    props: {
      newsData,
      highlightsData,
    },
  };
}
