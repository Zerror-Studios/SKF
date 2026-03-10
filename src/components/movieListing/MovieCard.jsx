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

  const videoUrl = data?.backgroundVideo;
  const posterUrl = data?.poster ? data.poster : "";

  return (
    <Link
      href={data?.slug ? `/movies/${data.slug}` : "#"}
      className="movie_card"
      ref={ref}
    >
      <div className="movie_img">
        {/* 🎞 Background video (desktop only) */}
        {!isMobile && videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            autoPlay
            loop
            playsInline
            poster={posterUrl}
          />
        )}

        {/* 🖼 Poster */}
        <Image
          width={1000}
          height={1000}
          src={posterUrl}
          alt={data?.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 665px"
          style={{ width: "100%", height: "auto" }}
          priority
        />

        {data?.category === "upcoming" && (
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
