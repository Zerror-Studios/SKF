import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import React, { useRef } from "react";

const SynopsisSection = ({ data }) => {
  const titleRef = useRef(null);
  const paraRef1 = useRef(null);

  useSplitTextMaskAnimation([titleRef, paraRef1]);
  return (
    <section id="synopsis_section">
      <h5 className="tag">Movies</h5>
      <h2 ref={titleRef} className="heading">Blockbuster Lineup</h2>
      <div className="synopsis_info">
        {data?.synopsis && (
          <p ref={paraRef1} className="description">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {data.synopsis}
          </p>
        )}
      </div>
    </section>
  );
};

export default SynopsisSection;
