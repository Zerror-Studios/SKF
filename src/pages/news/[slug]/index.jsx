import Highlights from "@/components/home/Highlights";
import NewsHeroSection from "@/components/news/NewsHeroSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { getBlogBySlug, getBlogSlugs, getOtherBlogs } from "@/lib/blog";
import { getContact } from "@/lib/contact";
import React from "react";

const News = ({ newsData, highlightsData }) => {
  return (
    <>
      <SeoHeader meta={newsData?.meta} news={newsData} />
      <NewsHeroSection data={newsData} />
      <Highlights tag={"More Highlights"} data={highlightsData} />
    </>
  );
};

export default News;

// 🔁 Static paths
export async function getStaticPaths() {
  const slugs = await getBlogSlugs();

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

// 🔁 Static props
export async function getStaticProps({ params }) {
  const { slug } = params;

  const [newsData, highlightsData, contact] = await Promise.all([
    getBlogBySlug(slug),
    getOtherBlogs(slug),
    getContact(),
  ]);
  if (!newsData) {
    return { notFound: true };
  }

  return {
    props: {
      newsData,
      highlightsData,
      contact,
    },
    revalidate: 60,
  };
}
