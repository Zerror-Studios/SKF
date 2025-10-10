import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { IoPlay, IoPause } from "react-icons/io5";

const GalleryDetailCard = ({ index, item, cardClass, isPlaying, onPlay }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const handleVideoClick = () => {
    if (item.type === "video") {
      onPlay(); // set this video as currently playing
    }
  };

  return (
    <div className={cardClass}>
      {item.type === "video" ? (
        <>
          <video
            ref={videoRef}
            src={item.url}
            muted
            loop
            playsInline
            onClick={handleVideoClick}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
          />
          <div className="video_player" onClick={handleVideoClick}>
            <span className="mute_btn">
              {isPlaying ? <IoPause /> : <IoPlay />}
            </span>
          </div>
        </>
      ) : (
        <Image
          src={item.url}
          alt={`media-${index}`}
          width={1000}
          height={1000}
        />
      )}
    </div>
  );
};

export default GalleryDetailCard;
