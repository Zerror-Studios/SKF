import AboutHeroSection from "@/components/about/AboutHeroSection";
import FilmographySection from "@/components/about/FilmographySection";
import SeoHeader from "@/components/seo/SeoHeader";
import { client } from "@/sanity/lib/client";

/* -------------------- PAGE -------------------- */
const About = ({ meta,aboutHeroSection, moviesData }) => {
  return (
    <>
      <SeoHeader meta={meta} />
        <AboutHeroSection data={aboutHeroSection} />
      <FilmographySection movies={moviesData} />
    </>
  );
};

export default About;

/* -------------------- STATIC PROPS -------------------- */
export async function getStaticProps() {
  try {
    const meta = {
      title: "About Us – Film Production House | Salman Khan Films",
      description:
        "Salman Khan Films is a Mumbai-based film production company established to create impactful cinema through strong storytelling and high production standards.",
      keywords:
        "About Salman Khan Films, SKF company profile, Bollywood film studio, Indian production house",
      author: "Salman Khan Films",
      robots: "index,follow",
    };

    // 🔹 About Hero Section (singleton)
    const aboutHeroSection =
      (await client.fetch(`
    *[_type == "aboutHeroSection" && _id == "aboutHeroSection"][0]{
      title,
      description,
      headOffice,
      totalMovies,
      "banner": banner.asset->url,
      bannerAlt
    }
  `)) || null;

    // 1️⃣ Fetch released movies (safe)
    const moviesFromSanity =
      (await client.fetch(`
        *[_type == "movies" && category == "released"]{
          title,
          year,
          director,
          "slug": slug.current
        }
      `)) || [];

    // 2️⃣ Fetch filmography (safe)
    const filmographyFromSanity =
      (await client.fetch(`
        *[_type == "filmography"]{
          title,
          year,
          director
        }
      `)) || [];

    // 3️⃣ Normalize + merge safely
    const moviesData = [
      ...moviesFromSanity,
      ...filmographyFromSanity.map((film) => ({
        ...film,
        slug: null,
      })),
    ]
      // 🛡️ remove items without year
      .filter((item) => typeof item.year === "number")
      // 🛡️ safe numeric sort
      .sort((a, b) => b.year - a.year);

    return {
      props: {
        meta,
        moviesData,
        aboutHeroSection,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("About page build error:", err);

    return {
      props: {
        meta: {
          title: "About Salman Khan Films",
        },
        moviesData: [],
      },
    };
  }
}
