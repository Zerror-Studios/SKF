import MovieTrailerVideo from "@/components/movieDetails/MovieTrailerVideo";
import PlaySvg from "@/components/movieDetails/PlaySvg";
import Image from "next/image";
import React, { useState } from "react";

const TrailerCard = ({ trailer, index, panelsRef }) => {
  const [showVideo, setShowVideo] = useState(false);

  // YouTube thumbnail URL
  const videoId = trailer.iframeUrl?.split("/embed/")[1];

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <>
      {/* Thumbnail Card */}
      <div
        className={`trailer_panel trailer_panel${index + 1}`}
        ref={panelsRef ? (el) => (panelsRef.current[index] = el) : null}
      >
        <div
          className="trailer_panel_poster"
        >
          <div className="trailer_banner">
            <Image
              width={1000}
              height={1000}
              src={thumbnail}
              alt={trailer.title}
            />
            <div className="movie_banner_overlay">
              <PlaySvg setShowVideo={setShowVideo} />
            </div>
          </div>

          <div className="trailer_panel_info">
            <p>{trailer.title}</p>
            <p>{trailer.type}</p>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showVideo && (
        <MovieTrailerVideo
          trailer={trailer?.iframeUrl}
          showVideo={showVideo}
          setShowVideo={setShowVideo}
        />
      )}
    </>
  );
};

export default TrailerCard;
