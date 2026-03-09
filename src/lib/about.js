import { client } from "@/sanity/lib/client";

export const getAboutHeroSection = async () => {
  return client.fetch(`
    *[_type == "aboutHeroSection" && _id == "aboutHeroSection"][0]{
      title,
      description,
      headOffice,
      totalMovies,
      "banner": banner.asset->url,
      bannerAlt
    }
  `);
};

export const getReleasedMovies = async () => {
  return client.fetch(`
    *[_type == "movies" && category == "released"]{
      title,
      year,
      director,
      "slug": slug.current
    }
  `);
};

export const getFilmography = async () => {
  return client.fetch(`
    *[_type == "filmography"]{
      title,
      year,
      director
    }
  `);
};