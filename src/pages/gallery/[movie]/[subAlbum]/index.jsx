import GalleryDetailList from "@/components/gallery/GalleryDetailList";
import GalleryTitleSection from "@/components/gallery/GalleryTitleSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { getContact } from "@/lib/contact";
import {
  getGallerySubAlbumBySlug,
  getGallerySubAlbumPaths,
} from "@/lib/gallery";

/* -------------------- PAGE COMPONENT -------------------- */

const AlbumSubDetail = ({ albumTitle, subAlbumTitle, media, meta }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <GalleryTitleSection title={subAlbumTitle} subHeading={albumTitle} />
      <GalleryDetailList media={media} />
    </>
  );
};

export default AlbumSubDetail;

/* -------------------- STATIC PATHS -------------------- */

export async function getStaticPaths() {
  const albums = await getGallerySubAlbumPaths();

  const paths = albums.flatMap((album) =>
    (album.subAlbums || []).map((sub) => ({
      params: {
        movie: album.albumSlug,
        subAlbum: sub.subSlug,
      },
    })),
  );

  return {
    paths,
    fallback: "blocking",
  };
}

/* -------------------- STATIC PROPS -------------------- */

export async function getStaticProps({ params }) {
  const { movie, subAlbum } = params;

  const [data, contact] = await Promise.all([
    getGallerySubAlbumBySlug(movie, subAlbum),
    getContact(),
  ]);

  if (!data || !data.subAlbums) {
    return { notFound: true };
  }

  const meta = {
    title: `${data.title} | ${data.subAlbums.title} | Salman Khan Films`,
    description: `Official ${data.subAlbums.title.toLowerCase()} from ${data.title}. Watch trailers, songs, and exclusive visuals from Salman Khan Films.`,
    keywords: `${data.title}, ${data.subAlbums.title}, Salman Khan Films gallery`,
    author: "Salman Khan Films",
    robots: "index,follow",
  };

  return {
    props: {
      albumTitle: data.title,
      subAlbumTitle: data.subAlbums.title,
      media: data.subAlbums.media,
      meta,
      contact,
    },
    revalidate: 60,
  };
}
