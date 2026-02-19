import React from "react";
import PlaySvg from "./PlaySvg";
import Image from "next/image";

const MovieBanner = ({ trailer, title, poster, bannerRef, setShowVideo }) => {
  return (
    <div
      ref={bannerRef}
      className="movie_banner"
      style={{ transform: "translateY(25%)" }}
    >
      <Image width={1000} height={1000} src={poster} alt="image" priority />
      {trailer && (
        <div className="movie_banner_overlay">
          <h2 className="heading">{title}</h2>
          <PlaySvg setShowVideo={setShowVideo} />
        </div>
      )}
    </div>
  );
};

export default MovieBanner;
