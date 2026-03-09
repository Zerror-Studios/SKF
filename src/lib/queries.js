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
      "poster": movie->poster.asset->url,
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
      "desktopBanner": {
        "url": desktopBanner.asset->url,
        "alt": desktopBanner.alt
      },
      "mobileBanner": {
        "url": mobileBanner.asset->url,
        "alt": mobileBanner.alt
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
// Home About Page 


export async function getHomeAbout() {
  const query = `*[_type == "homeAbout" && _id == "homeAbout"][0]{
    title,
    description,
    "backgroundImage": backgroundImage.asset->url
  }`;

  return client.fetch(query);
}



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






