import GalleryList from "@/components/gallery/GalleryList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { galleryAlbums } from "@/helper/albumData";
import { movies } from "@/helper/moviesData";

const AlbumDetail = ({
  meta,
  subAlbums,
  movieTitle,
  movieSlug,
  hasMoviePage,
}) => {
   const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: movieTitle },
  ];
  return (
    <>
      <SeoHeader meta={meta} />
      <GalleryTitleSection title={movieTitle} subHeading="GALLERY" breadcrumbs={breadcrumbs} />
      <GalleryList
        data={subAlbums}
        movieSlug={movieSlug}
        hasMoviePage={hasMoviePage}
      />
    </>
  );
};

export default AlbumDetail;

export async function getStaticPaths() {
  const paths = galleryAlbums.map((movie) => ({
    params: { movie: movie.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const movieData = galleryAlbums.find((movie) => movie.slug === params.movie);

  if (!movieData) {
    return { notFound: true };
  }
  // check if this movie exists in movies list
  const hasMoviePage = movies.some((m) => m.slug === params.movie);

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
      subAlbums: movieData.subAlbums,
      movieTitle: movieData.title,
      movieSlug: movieData.slug,
      hasMoviePage,
    },
  };
}
