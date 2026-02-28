import { urlFor } from "@/sanity/lib/image";
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
  const posterUrl = data?.poster ? urlFor(data.poster).url() : "";

  const CardWrapper = ({ children }) => {
    if (data?.category === "released" && data?.slug) {
      return (
        <Link
          href={`/movies/${data?.slug}`}
          className="movie_card"
          ref={ref}
        >
          {children}
        </Link>
      );
    }

    return (
      <div className="movie_card upcoming" ref={ref}>
        {children}
      </div>
    );
  };

  return (
    <CardWrapper>
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

        {/* 🖼 Poster fallback */}
        <Image
          width={1000}
          height={1000}
          src={posterUrl}
          alt={data?.title}
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
    </CardWrapper>
  );
});

export default MovieCard;
