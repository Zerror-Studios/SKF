import React, { useRef } from "react";
import DirectorsContainer from "../common/Directors/DirectorsContainer";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";

const directors = [
  { id: 1, name: "Kabir khan", image: "/images/home/d1.png" },
  { id: 2, name: "Nitin Kakkar ", image: "/images/home/d2.png" },
  { id: 3, name: "Nikhil Advani", image: "/images/home/d3.png" },
  { id: 4, name: "Jean-François Pouliot", image: "/images/home/d4.png" },
  { id: 5, name: "Ali Abbas Zafar", image: "/images/home/d5.png" },
  { id: 6, name: "Ali Abbas Zafar", image: "/images/home/d6.png" },
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
          Visionaries <span className="letter-u">Behind</span> the <br />
          <span className="letter-u">Camera</span>
        </h3>
      </div>
      <DirectorsContainer data={directors} />
    </section>
  );
};

export default DirectorsSection;
