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
       "image": image.asset->url,
    }
  `);



// 🧾 Blog slugs (for getStaticPaths)
export const getBlogSlugs = () =>
  client.fetch(`
    *[_type == "blog"].slug.current
  `);


// 📰 Single blog by slug
// 📰 Single blog by slug
export const getBlogBySlug = (slug, preview = false) =>
  client.fetch(
    `
    *[_type == "blog" && slug.current == $slug][0]{
      "slug": slug.current,
      publishedAt,
      title,
      description,
      readingTime,
      content,
      "image": image.asset->url,
      meta
    }
    `,
    { slug },
    preview
      ? { perspective: "previewDrafts", useCdn: false }
      : { perspective: "published", useCdn: true }
  );

// ✨ Other blogs (exclude current)

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
       "image": image.asset->url,
    }
  `,
    { slug }
  );


