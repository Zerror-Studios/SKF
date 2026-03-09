import AboutHeroSection from "@/components/about/AboutHeroSection";
import FilmographySection from "@/components/about/FilmographySection";
import SeoHeader from "@/components/seo/SeoHeader";
import {
  getAboutHeroSection,
  getFilmography,
  getReleasedMovies,
} from "@/lib/about";
import { getContact } from "@/lib/contact";

const About = ({ meta, aboutHeroSection, moviesData }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <AboutHeroSection data={aboutHeroSection} />
      <FilmographySection movies={moviesData} />
    </>
  );
};

export default About;


export async function getStaticProps() {
  const meta = {
    title: "About Us – Film Production House | Salman Khan Films",
    description:
      "Salman Khan Films is a Mumbai-based film production company established to create impactful cinema through strong storytelling and high production standards.",
    keywords:
      "About Salman Khan Films, SKF company profile, Bollywood film studio, Indian production house",
    author: "Salman Khan Films",
    robots: "index,follow",
  };

  const [
    aboutHeroSection,
    moviesFromSanity,
    filmographyFromSanity,
    contact,
  ] = await Promise.all([
    getAboutHeroSection(),
    getReleasedMovies(),
    getFilmography(),
    getContact(),
  ]);

  const moviesData = [
    ...(moviesFromSanity || []),
    ...(filmographyFromSanity || []).map((film) => ({
      ...film,
      slug: null,
    })),
  ]
    .filter((item) => typeof item.year === "number")
    .sort((a, b) => b.year - a.year);

  return {
    props: {
      meta,
      aboutHeroSection,
      moviesData,
      contact,
    },
    revalidate: 60,
  };
}