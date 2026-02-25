import GalleryDetailList from "@/components/gallery/GalleryDetailList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { galleryAlbums } from "@/helper/albumData";

const AlbumSubDetail = ({
  albumTitle,
  subAlbumTitle,
  media,
  meta,
  movieSlug,
}) => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: albumTitle, href: `/gallery/${movieSlug}` },
    { label: subAlbumTitle },
  ];
  return (
    <>
      <SeoHeader meta={meta} />
      <GalleryTitleSection
        title={subAlbumTitle}
        subHeading={albumTitle}
        breadcrumbs={breadcrumbs}
      />

      <GalleryDetailList media={media} />
    </>
  );
};

export default AlbumSubDetail;

export async function getStaticPaths() {
  const paths = galleryAlbums.flatMap((album) =>
    (album.subAlbums || []).map((sub) => ({
      params: {
        movie: album.slug,
        subAlbum: sub.slug,
      },
    })),
  );

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const movieData = galleryAlbums.find((a) => a.slug === params.movie);

  if (!movieData) return { notFound: true };

  const subAlbum = movieData.subAlbums.find((s) => s.slug === params.subAlbum);

  if (!subAlbum) return { notFound: true };

  const meta = {
    title: `${movieData.title} | ${subAlbum.title} | Salman Khan Films`,
    description: `Official ${subAlbum.title.toLowerCase()} from ${movieData.title}. Watch trailers, songs, and exclusive visuals from Salman Khan Films.`,
    keywords: `${movieData.title}, ${subAlbum.title}, Salman Khan Films gallery`,
    author: "Salman Khan Films",
    robots: "index,follow",
  };

  return {
    props: {
      albumTitle: movieData.title,
      subAlbumTitle: subAlbum.title,
      media: subAlbum.media,
      meta,
      movieSlug: movieData.slug,
    },
  };
}
