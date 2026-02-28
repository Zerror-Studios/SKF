import Highlights from "@/components/home/Highlights";
import NewsHeroSection from "@/components/news/NewsHeroSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { news } from "@/helper/newsData";
import { client } from "@/sanity/lib/client";
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

export async function getStaticPaths() {
  const slugs = await client.fetch(`
    *[_type == "blog"].slug.current
  `);

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking", //  important
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  //  Current blog
  const newsData = await client.fetch(
    `
    *[_type == "blog" && slug.current == $slug][0]{
      "slug": slug.current,
      publishedAt,
      title,
      description,
      readingTime,
      content,
      image,
      meta
    }
  `,
    { slug },
  );

  if (!newsData) {
    return { notFound: true };
  }

  //  Other blogs (exclude current)
  const highlightsData = await client.fetch(
    `
    *[_type == "blog" && slug.current != $slug]
    | order(publishedAt desc){
      "slug": slug.current,
      publishedAt,
      title,
      description,
      image
    }
  `,
    { slug },
  );

  return {
    props: {
      newsData,
      highlightsData,
    },
    revalidate: 60,
  };
}
