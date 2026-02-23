import Image from "next/image";
import Link from "next/link";
import React, { forwardRef, useState, useEffect, useRef } from "react";

const MovieCard = forwardRef(({ data }, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Link href={`/movies/${data?.slug}`} className={`movie_card ${data?.category === "upcoming movie" ? "upcoming":"" }`} ref={ref}>
      <div className="movie_img">
        {/* 🔹 Video for non-mobile */}
        {!isMobile && data?.backgroundVideo && (
          <video
            ref={videoRef}
            src={data.backgroundVideo}
            muted
            autoPlay
            playsInline
            loop
          />
        )}

        {/* 🔹 Poster */}
        <Image
          width={1000}
          height={1000}
          src={data?.poster}
          alt={data?.title}
          priority
        />
        {data?.category === "upcoming movie" && (
          <span className="ribbon">Upcoming</span>
        )}
      </div>

      <div className="movie_dets">
        <span>{data?.title}</span>
        <span>{data?.year}</span>
      </div>
    </Link>
  );
});

export default MovieCard;
