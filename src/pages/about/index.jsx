import AboutHeroSection from "@/components/about/AboutHeroSection";
import FilmographySection from "@/components/about/FilmographySection";
import SeoHeader from "@/components/seo/SeoHeader";
import { client } from "@/sanity/lib/client";

const About = ({ meta, moviesData }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <AboutHeroSection />
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

  // 1️⃣ Fetch released movies
  const moviesFromSanity = await client.fetch(`
  *[_type == "movies" && category == "released"]{
    title,
    year,
    director,
    "slug": slug.current
  }
`);

  // 2️⃣ Fetch filmography
  const filmographyFromSanity = await client.fetch(`
  *[_type == "filmography"]{
    title,
    year,
    director
  }
`);

  // 3️⃣ Normalize + merge
  const moviesData = [
    ...moviesFromSanity,
    ...filmographyFromSanity.map((film) => ({
      ...film,
      slug: null,
    })),
  ].sort((a, b) => b.year - a.year);
  return {
    props: {
      meta,
      moviesData,
    },
    revalidate: 60, // optional ISR
  };
}
