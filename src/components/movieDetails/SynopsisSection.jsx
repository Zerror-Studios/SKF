import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import React, { useRef } from "react";

const SynopsisSection = ({ data }) => {
  const titleRef = useRef(null);
  const paraRef1 = useRef(null);

  useSplitTextMaskAnimation([titleRef, paraRef1]);
  return (
    <section id="synopsis_section">
      <h5 className="tag">Synopsis</h5>
      <h2 ref={titleRef} className="heading">
        Discover the <span className="letter-u"> story, </span> <br />
        the <span className="letter-u"> people </span> behind it.
      </h2>
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
