import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import React, { useRef } from "react";

const SynopsisSection = () => {
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
        <p ref={paraRef1} className="description">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; The trouble begins when
          politician Shashikant Bhide announces that all stray dogs will be
          caught and killed unless societies submit a No Objection Certificate
          (NOC). This puts Bhidu’s life at risk, and the kids launch a campaign
          across the colony to save him. They go door-to-door, trying to
          convince adults, but fall short of the votes needed. In a desperate
          move, the children stage an underwear march, grabbing media attention
          and public sympathy. Their bold act sparks conversation and support,
          but it still isn’t enough to overturn Bhide’s rule.
        </p>
      </div>
    </section>
  );
};

export default SynopsisSection;
