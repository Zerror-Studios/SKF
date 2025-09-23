import React from "react";
import PlaySvg from "./PlaySvg";
import Image from "next/image";

const MovieBanner = ({bannerRef,setShowVideo}) => {
  return (
    <div
      ref={bannerRef}
      className="movie_banner"
      style={{ transform: "translateY(25%)"}}
    >
      <Image
        width={1000}
        height={1000}
        src="/images/moviedetails/movie_banner.png"
        alt="image"
        priority
      />
      <div className="movie_banner_overlay">
        <h2 className="heading">sikandar</h2>
        <PlaySvg setShowVideo={setShowVideo} />
      </div>
    </div>
  );
};

export default MovieBanner;
