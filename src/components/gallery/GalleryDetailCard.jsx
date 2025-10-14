import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { IoPlay } from "react-icons/io5";

const GalleryDetailCard = ({
  index,
  item,
  cardClass,
  isPlaying,
  onClick,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.play();
    else videoRef.current.pause();
  }, [isPlaying]);

  return (
    <div className={cardClass} onClick={onClick}>
      {item.type === "video" ? (
        <>
          <video ref={videoRef} src={item.url} muted loop playsInline />
          <div className="video_player">
            <span className="mute_btn">
              <IoPlay />
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
