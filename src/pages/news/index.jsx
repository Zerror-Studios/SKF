import React from "react";
import Highlights from "@/components/home/Highlights";
import SeoHeader from "@/components/seo/SeoHeader";
import { getAllBlogs } from "@/lib/blog";
import { getContact } from "@/lib/contact";

const News = ({ meta, blogs }) => {
  return (
    <>
      <SeoHeader meta={meta} />

      <Highlights
        tag="Blogs"
        title={
          <>
            Fresh <span className="letter-u">Stories</span>
          </>
        }
        ish1={true}
        data={blogs}
        isHero={true}
      />
    </>
  );
};

export default News;

/* -------------------- STATIC PROPS -------------------- */

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

  const [blogs, contact] = await Promise.all([getAllBlogs(), getContact()]);

  return {
    props: {
      meta,
      blogs,
      contact,
    },
    revalidate: 60,
  };
}
