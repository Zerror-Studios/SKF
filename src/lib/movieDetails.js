import { client } from "@/sanity/lib/client";


export const getMovieBySlug = async (slug, preview = false) => {
  return client.fetch(
    `
    *[
      _type == "movies" &&
      slug.current == $slug
    ][0]{
      title,
      year,
      category,
      director,
      produced,
      synopsis,
      genre,
      watchNow,
      trailer,
      teaser,
      meta,
      "backgroundVideo": backgroundVideo.asset->url,
      "poster": poster.asset->url,
      "slug": slug.current,

      cast[]{
        name,
        "image": image.asset->url
      }
    }
    `,
    { slug },
    {
      perspective: preview ? "previewDrafts" : "published",
      useCdn: false
    }
  );
};



export const getLatestMovies = async (slug) => {
  return client.fetch(
    `
    *[
      _type == "movies" &&
      category == "released" &&
      defined(slug.current) &&
      slug.current != $slug
    ]
    | order(year desc)[0...3]{
      title,
      year,
      "poster": poster.asset->url,
      category,
      "backgroundVideo": backgroundVideo.asset->url,
      "slug": slug.current
    }
  `,
    { slug }
  );
};

export const getMovieSlugs = async () => {
  return client.fetch(`
    *[
      _type == "movies" &&
      defined(slug.current)
    ].slug.current
  `);
};

export const getMovieGallery = async (slug) => {
  return client.fetch(
    `
    *[_type == "galleryAlbum" && slug.current == $slug][0]{
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
  `,
    { slug }
  );
};