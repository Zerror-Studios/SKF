import { client } from "@/sanity/lib/client";

// 📰 Blogs (All)
export const getAllBlogs = () =>
  client.fetch(`
    *[_type == "blog"]
    | order(publishedAt desc){
      "slug": slug.current,
      publishedAt,
      title,
      description,
      image
    }
  `);



// 🧾 Blog slugs (for getStaticPaths)
export const getBlogSlugs = () =>
  client.fetch(`
    *[_type == "blog"].slug.current
  `);


// 📰 Single blog by slug
export const getBlogBySlug = (slug) =>
  client.fetch(
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
    { slug }
  );


// ✨ Other blogs (exclude current)
export const getOtherBlogs = (slug) =>
  client.fetch(
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
    { slug }
  );