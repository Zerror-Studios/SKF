import { client } from "@/sanity/lib/client";

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
