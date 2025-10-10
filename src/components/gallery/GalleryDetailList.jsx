import React, { useState } from "react";
import GalleryDetailCard from "./GalleryDetailCard";

const GalleryDetailList = ({ data }) => {
  const [playingIndex, setPlayingIndex] = useState(null);

  const handlePlay = (index) => {
    // toggle: if same video clicked, pause it
    setPlayingIndex((prev) => (prev === index ? null : index));
  };

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
            isPlaying={playingIndex === index}
            onPlay={() => handlePlay(index)}
          />
        );
      })}
    </div>
  );
};

export default GalleryDetailList;
