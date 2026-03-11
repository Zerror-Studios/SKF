import GalleryList from "@/components/gallery/GalleryList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { getContact } from "@/lib/contact";
import { checkMovieExists, getGalleryAlbumBySlug, getGalleryAlbumSlugs } from "@/lib/gallery";


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
        title={movieTitle}
      />
    </>
  );
};

export default AlbumDetail;

/* -------------------- STATIC PATHS -------------------- */

export async function getStaticPaths() {
  try {
    const albums = await getGalleryAlbumSlugs();

    const paths = albums
      .filter((album) => album?.slug)
      .map((album) => ({
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
  const slug = params?.movie;

  if (!slug) {
    return { notFound: true };
  }

  const [movieData, hasMoviePage, contact] = await Promise.all([
    getGalleryAlbumBySlug(slug),
    checkMovieExists(slug),
    getContact(),
  ]);

  if (!movieData) {
    return { notFound: true };
  }

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
      contact,
    },
    revalidate: 60,
  };
}
