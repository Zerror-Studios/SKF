import React, { useRef } from "react";
import DirectorsContainer from "../common/Directors/DirectorsContainer";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";

const DirectorsSection = ({directorSpotlight}) => {
  
  const titleRef = useRef(null);
  const paraRef = useRef(null);

  useSplitTextMaskAnimation([titleRef, paraRef]);

  return (
    <section id="directors_section">
      <div className="directors_section_header">
        <h5 className="tag1">Directors</h5>
        <h3 ref={titleRef} className="heading">
          Director <span className="letter-u">Spotlight</span>
        </h3>
        <p className="description">
          At SKF, our directors transform ideas into unforgettable cinematic
          experiences, <br />
          combining creativity, discipline, emotion, and innovation to bring
          powerful stories to life.
        </p>
      </div>
      <DirectorsContainer data={directorSpotlight} />
    </section>
  );
};

export default DirectorsSection;
