import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import React, { useRef } from "react";

const SynopsisSection = ({ data }) => {
  const titleRef = useRef(null);
  const paraRef1 = useRef(null);

  useSplitTextMaskAnimation([titleRef, paraRef1]);
  return (
    <section id="synopsis_section">
      <h5 className="tag1">Synopsis</h5>
      <h2 ref={titleRef} className="heading">Blockbuster <span className="letter-u">Lineup</span></h2>
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
