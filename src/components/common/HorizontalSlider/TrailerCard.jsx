import Image from "next/image";
import React from "react";
import { FiPlay } from "react-icons/fi";

// ✅ Optimized YouTube thumbnail extractor
const getYouTubeThumbnail = (url) => {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    const videoId = parsed.searchParams.get("v");

    // Standard YouTube format -> ?v=ID
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }

    // Short format -> youtu.be/ID
    const parts = url.split("/");
    const id = parts.pop().split("?")[0];

    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  } catch (err) {
    return "";
  }
};

const TrailerCard = ({ item, index, panelsRef ,onClick }) => {
  const thumbnailUrl = getYouTubeThumbnail(item?.url);

  return (
    <div
      className={`trailer_panel trailer_panel${index + 1}`}
      onClick={onClick}
      ref={panelsRef ? (el) => (panelsRef.current[index] = el) : null}
    >
      <div className="trailer_panel_poster">
        <div className="trailer_banner">
          <Image
            width={1000}
            height={1000}
            src={thumbnailUrl || "/fallback-thumbnail.jpg"}
            alt="YouTube thumbnail"
            priority
          />

          <span className="card_play_icon">
            <FiPlay />
          </span>
        </div>

        <div className="trailer_panel_info">
          <p >{item?.title}</p>
          <p >{item?.type}</p>
        </div>
      </div>
    </div>
  );
};

export default TrailerCard;
