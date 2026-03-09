import { client } from "@/sanity/lib/client";

export const getGalleryAlbums = async () => {
    return client.fetch(`
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
};


// Gallery Details 

export const getGalleryAlbumSlugs = async () => {
    return client.fetch(`
    *[_type == "galleryAlbum" && defined(slug.current)]{
      "slug": slug.current
    }
  `);
};

export const getGalleryAlbumBySlug = async (slug) => {
    return client.fetch(
        `
    *[_type == "galleryAlbum" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
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

export const checkMovieExists = async (slug) => {
    return client.fetch(
        `count(*[_type == "movies" && slug.current == $slug]) > 0`,
        { slug }
    );
};


// Gallery Sub Details 

export const getGallerySubAlbumPaths = async () => {
    return client.fetch(`
    *[_type == "galleryAlbum"]{
      "albumSlug": slug.current,
      "subAlbums": subAlbums[]{
        "subSlug": slug.current
      }
    }
  `);
};

export const getGallerySubAlbumBySlug = async (albumSlug, subSlug) => {
    return client.fetch(
        `
    *[_type == "galleryAlbum" && slug.current == $albumSlug][0]{
      title,
      subAlbums[slug.current == $subSlug][0]{
        title,
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
        { albumSlug, subSlug }
    );
};