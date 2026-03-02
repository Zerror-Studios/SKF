import { client } from "@/sanity/lib/client";

const SITE_URL = "https://www.salmankhanfilms.com";

function generateSiteMap({ movies, blogs, galleries }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Static Pages -->
  <url>
    <loc>${SITE_URL}/</loc>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>${SITE_URL}/movies</loc>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${SITE_URL}/news</loc>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${SITE_URL}/about</loc>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${SITE_URL}/contact</loc>
    <priority>0.9</priority>
  </url>

  <!-- Gallery Main -->
  <url>
    <loc>${SITE_URL}/gallery</loc>
    <priority>0.8</priority>
  </url>

  <!-- Movies -->
  ${movies
      .map(
        (movie) => `
      <url>
        <loc>${SITE_URL}/movies/${movie.slug}</loc>
        <priority>0.8</priority>
      </url>
    `
      )
      .join("")}

  <!-- Blogs -->
  ${blogs
      .map(
        (blog) => `
      <url>
        <loc>${SITE_URL}/news/${blog.slug}</loc>
        <priority>0.7</priority>
      </url>
    `
      )
      .join("")}

  <!-- Gallery Albums -->
  ${galleries
      .map(
        (album) => `
      <url>
        <loc>${SITE_URL}/gallery/${album.slug}</loc>
        <priority>0.7</priority>
      </url>
    `
      )
      .join("")}

</urlset>`;
}

export async function getServerSideProps({ res }) {
  // 🎬 Movies
  const movies = await client.fetch(`
    *[_type == "movies" && defined(slug.current)]{
      "slug": slug.current
    }
  `);

  // 📰 Blogs
  const blogs = await client.fetch(`
    *[_type == "blog" && defined(slug.current)]{
      "slug": slug.current
    }
  `);

  // 🖼 Gallery Albums
  const galleries = await client.fetch(`
    *[_type == "galleryAlbum" && defined(slug.current)]{
      "slug": slug.current
    }
  `);

  const sitemap = generateSiteMap({ movies, blogs, galleries });

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  return null;
}