import React, { useRef } from "react";
import HighlightCard from "./HighlightCard";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import Cursor from "../common/Cursor";
import Button from "../common/Button";

// highlightData.js
const highlightData = [
  {
    id: 1,
    date: "August 1, 2025",
    title: "Sikander Creates Box Office Storm",
    description:
      "Sikander, starring Karthi and directed by Siva, has taken the box office by storm, raking in impressive numbers during its opening weekend. The film's gripping storyline and stellar performances have captivated audiences nationwide.",
    image: "/images/home/news1.png",
  },
  {
    id: 2,
    date: "August 1, 2025",
    title: "Kisi Ka Bhai Kisi Ki Jaan Finds New Audience on OTT",
    description:
      "Kisi Ka Bhai Kisi Ki Jaan, featuring Salman Khan, has found a new audience on OTT platforms. The film's blend of action and drama has resonated with viewers, leading to a surge in streaming numbers and positive reviews.",
    image: "/images/home/news2.png",
  },
  {
    id: 3,
    date: "August 1, 2025",
    title: "Kick 2 Brings Back Devil in Style",
    description:
      "Kick 2, the much-anticipated sequel to the original Kick, has brought back the devil in style. With its high-octane action sequences and charismatic lead performance, the film has rekindled the excitement of fans and critics alike.",
    image: "/images/home/news3.png",
  },
];

const Highlights = () => {
  const titleRef = useRef(null);
  useSplitTextMaskAnimation([titleRef]);

  return (
    <section id="highlight_section">
      <h5 className="tag">highlight</h5>
      <h2 ref={titleRef}>News and Updates</h2>
      <div id="highlights_container">
        {highlightData.map((item, index) => (
          <HighlightCard
            key={item.id}
            data={item}
            isLast={index === highlightData.length - 1}
          />
        ))}
      </div>
      <div className="btn_container">
        <Button color={"black"} title={"read more"} />
      </div>
    </section>
  );
};

export default Highlights;
