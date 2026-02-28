import GalleryList from "@/components/gallery/GalleryList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { client } from "@/sanity/lib/client";

/* -------------------- PAGE COMPONENT -------------------- */
const AlbumDetail = ({
  meta,
  subAlbums,
  movieTitle,
  movieSlug,
  hasMoviePage,
}) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <GalleryTitleSection title={movieTitle} subHeading="GALLERY" />
      <GalleryList
        data={subAlbums}
        movieSlug={movieSlug}
        hasMoviePage={hasMoviePage}
      />
    </>
  );
};

export default AlbumDetail;

/* -------------------- STATIC PATHS -------------------- */
export async function getStaticPaths() {
  try {
    const albums = await client.fetch(`
      *[_type == "galleryAlbum" && defined(slug.current)]{
        "slug": slug.current
      }
    `);

    const paths = albums
      .filter(album => album?.slug)
      .map(album => ({
        params: { movie: album.slug },
      }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (err) {
    console.error("getStaticPaths error:", err);

    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

/* -------------------- STATIC PROPS -------------------- */
export async function getStaticProps({ params }) {
  try {
    const slug = params?.movie;

    if (!slug) {
      return { notFound: true };
    }

    // 1️⃣ Fetch gallery album
    const movieData = await client.fetch(
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

    if (!movieData) {
      return { notFound: true };
    }

    // 2️⃣ Check if movie exists
    const hasMoviePage = await client.fetch(
      `count(*[_type == "movies" && slug.current == $slug]) > 0`,
      { slug }
    );

    const meta = {
      title: `${movieData.title} | Media Gallery | Salman Khan Films`,
      description: `Official media gallery of ${movieData.title} featuring trailers, songs, images, and behind-the-scenes visuals.`,
      keywords: `${movieData.title}, Salman Khan Films gallery`,
      author: "Salman Khan Films",
      robots: "index,follow",
    };

    return {
      props: {
        meta,
        subAlbums: movieData.subAlbums || [],
        movieTitle: movieData.title,
        movieSlug: movieData.slug,
        hasMoviePage,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("getStaticProps error:", err);
    return { notFound: true };
  }
}