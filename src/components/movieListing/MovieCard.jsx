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
  const posterUrl = `${data?.poster}?w=700&fit=max&auto=format&q=80`;

  const hasVideo = !isMobile && videoUrl;

  return (
  
      <Link
  href={data?.slug ? `/movies/${data.slug}` : "#"}
  className={`movie_card ${hasVideo ? "has-video" : ""}`}
  ref={ref}
>
      <div className="movie_img">
        {/* 🎞 Background video (desktop only) */}
        {hasVideo && (
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
          src={posterUrl}
          alt={`${data?.title} movie poster`}
          width={665}
          height={374}
          sizes="(max-width:768px) 100vw, 665px"
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
