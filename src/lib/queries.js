import { client } from "@/sanity/lib/client";

//  Hero Section
export const getHeroSection = () =>
    client.fetch(`
    *[_type == "heroSection"][0]{
      "videoUrl": video.asset->url,
      videoAlt
    }
  `);

//  Home Top Movies
export const getHomeTopMovies = () =>
    client.fetch(`
    *[_type == "homeTopMovie"]
    | order(orderRank asc)[0...3]{
      "title": movie->title,
      "year": movie->year,
      "poster": movie->poster,
      "category": movie->category,
      "slug": movie->slug.current,
      "backgroundVideo": movie->backgroundVideo.asset->url
    }
  `);

// 🎞 Upcoming Release (Singleton)
export const getUpcomingRelease = () =>
  client.fetch(`
    *[_type == "upcomingRelease" && _id == "upcomingRelease"][0]{
      movieTitle,
      desktopBanner{
        asset->{
          url
        },
        alt
      },
      mobileBanner{
        asset->{
          url
        },
        alt
      }
    }
  `);

//  Director Spotlight 
export const getDirectorSpotlight = () =>
    client.fetch(`
    *[_type == "homeDirectorSpotlight"] | order(_createdAt asc){
      name,
      directorOf,
      description,
      "image": image.asset->url
    }
  `);

//  Blogs
export const getBlogs = () =>
    client.fetch(`
    *[_type == "blog"] | order(publishedAt desc){
      "slug": slug.current,
      publishedAt,
      title,
      description,
      image
    }
  `);

//  Gallery Albums
export const getGalleryAlbums = () =>
    client.fetch(`
    *[_type == "galleryAlbum"] | order(orderRank asc){
      title,
      "slug": slug.current,
      "cover": cover.asset->url,

      subAlbums[]{
        title,
        "slug": slug.current,
        "cover": cover.asset->url,

        media[]{
          type,
          "src": select(
            type == "image" => image.asset->url,
            type == "video" => videoUrl
          )
        }
      }
    }
  `);

// 🎬 Movies Listing (All movies)
export const getAllMovies = () =>
    client.fetch(`
    *[_type == "movies"]
    | order(orderRank asc){
      title,
      year,
      category,
      "slug": slug.current,
      poster,
      "backgroundVideo": backgroundVideo.asset->url
    }
  `);

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