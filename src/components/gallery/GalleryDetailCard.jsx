import Image from "next/image";
import React from "react";
import { FiPlay } from "react-icons/fi";

const getYouTubeThumbnail = (url) => {
  try {
    // extract video ID from different possible YouTube URL formats
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const parts = url.split("/");
    const id = parts[parts.length - 1].split("?")[0];
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  } catch {
    return "";
  }
};

const GalleryDetailCard = ({ index, item, cardClass, onClick }) => {
  const thumbnailUrl = getYouTubeThumbnail(item.url);

  return (
    <div className={cardClass} onClick={onClick}>
      <div className="video_wrapper">
        {thumbnailUrl ? (
          <>
            <Image
              width={1000}
              height={1000}
              src={thumbnailUrl}
              alt={`YouTube thumbnail ${index}`}
              className="video_thumbnail"
            />
            <span className="card_play_icon"><FiPlay /></span>
          </>
        ) : (
          <div className="video_placeholder">No Thumbnail Available</div>
        )}
      </div>
    </div>
  );
};

export default GalleryDetailCard;
