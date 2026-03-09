import Highlights from "@/components/home/Highlights";
import SeoHeader from "@/components/seo/SeoHeader";
import { getAllBlogs, getContact } from "@/lib/queries";
import React from "react";

const News = ({ meta, blogs }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <Highlights
        tag={"Blogs"}
        title={
          <>
            Fresh <span className="letter-u">Stories</span>
          </>
        }
        data={blogs}
        isHero={true}
      />
    </>
  );
};

export default News;

export async function getStaticProps() {
  const meta = {
    title: "Latest News & Blogs | Salman Khan Films",
    description:
      "Read the latest news, blogs, announcements, and updates from Salman Khan Films. Stay informed about new releases, film projects, and behind-the-scenes stories.",
    keywords:
      "Salman Khan Films news, SKF blogs, Bollywood film news, Salman Khan updates, Hindi cinema news",
    author: "Salman Khan Films",
    robots: "index,follow",
  };

  const blogs = await getAllBlogs();
  const contact = await getContact();

  return {
    props: {
      meta,
      blogs,
      contact,
    },
    revalidate: 60,
  };
}
