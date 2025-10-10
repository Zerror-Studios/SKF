import React, { useState } from "react";
import GalleryDetailCard from "./GalleryDetailCard";

const GalleryDetailList = ({ data }) => {
  const [playingIndex, setPlayingIndex] = useState(null);

  return (
    <div id="gallery_detail_list">
      {data?.media?.map((item, index) => {
        const patternIndex = index % 5;
        const cardClass =
          patternIndex === 0 || patternIndex === 1
            ? "gallery_detail_card_large"
            : "gallery_detail_card_small";

        return (
          <GalleryDetailCard
            key={index}
            index={index}
            item={item}
            cardClass={cardClass}
            isPlaying={playingIndex === index} // ✅ pass isPlaying
            onPlay={() => setPlayingIndex(index)} // ✅ pass onPlay
          />
        );
      })}
    </div>
  );
};

export default GalleryDetailList;
