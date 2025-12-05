import React, { useRef } from "react";
import DirectorsContainer from "../common/Directors/DirectorsContainer";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";

const directors = [
  {
    name: "A. R. Murugadoss",
    directorOf: "Sikandar",
    description:
      "Known for high-impact action films with strong emotional storytelling.",
    image: "/images/home/directors/ar murugadoss.webp",
  },
  {
    name: "Kabir Khan",
    directorOf: "Bajrangi Bhaijaan",
    description:
      "Crafts big-hearted journeys that celebrate humanity across borders.",
    image: "/images/home/directors/Kabir khan.webp",
  },
  {
    name: "Mahesh Manjrekar",
    directorOf: "Antim",
    description:
      "Brings rugged authenticity shaped by strong characters and raw emotion.",
    image: "/images/home/directors/Mahesh Manjrekar.webp",
  },
  {
    name: "Nikkhil Advani",
    directorOf: "Hero",
    description:
      "Known for stylish narratives that balance drama, romance, and fast-paced tension.",
    image: "/images/home/directors/Nikkhil advani.webp",
  },
  {
    name: "Prabhu Deva",
    directorOf: "Dabangg:3 AND RADHE",
    description:
      "Delivers full-throttle, stylized action designed for loud, explosive impact.",
    image: "/images/home/directors/Prabu Deva.webp",
  },
  {
    name: "Farhad Samji",
    directorOf: "Kisi Ka Bhai Kisi Ki Jaan",
    description:
      "Specializes in loud, colourful entertainers driven by humour and spectacle.",
    image: "/images/home/directors/Farhad samaji.webp",
  },
  {
    name: "Remo D’Souza",
    directorOf: "Race 3",
    description:
      "Known for glossy, adrenaline-heavy frames loaded with visual punch.",
    image: "/images/home/directors/remo d'souza.webp",
  },
  {
    name: "Soumendra Padhi",
    directorOf: "Farrey",
    description:
      "Creates intense, grounded stories with sharp realism and emotional weight.",
    image: "/images/home/directors/Soumendra padhi.webp",
  },
  {
    name: "Abhiraj K. Minawala",
    directorOf: "Loveyatri",
    description:
      "Adds a youthful spark with bright, feel-good romantic energy.",
    image: "/images/home/directors/Abhiraj K. Minawala.webp",
  },
];

const DirectorsSection = () => {
  const titleRef = useRef(null);
  const paraRef = useRef(null);

  useSplitTextMaskAnimation([titleRef, paraRef]);

  return (
    <section id="directors_section">
      <div className="directors_section_header">
        <h5 className="tag">Directors</h5>
        <h3 ref={titleRef} className="heading">
          Director Spotlight
        </h3>
        <p className="description">
          At SKF, our directors transform ideas into unforgettable cinematic <br />
          experiences combining creativity, discipline, emotion, and innovation <br />
          to bring powerful stories to life.
        </p>
      </div>
      <DirectorsContainer data={directors} />
    </section>
  );
};

export default DirectorsSection;
