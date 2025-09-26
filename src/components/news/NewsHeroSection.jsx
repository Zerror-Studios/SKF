import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import React, { useRef } from "react";
import NewsPoster from "./NewsPoster";
import NewsDetails from "./NewsDetails";

const NewsHeroSection = () => {
  const titleRef = useRef(null);
  useSplitTextMaskAnimation([titleRef]);

  return (
    <div id="news_hero_section">
      <h5 className="tag">News</h5>
      <h4 ref={titleRef} className="heading">
        Latest News and <br /> Updates
      </h4>
      <NewsPoster />
      <NewsDetails />
    </div>
  );
};

export default NewsHeroSection;
