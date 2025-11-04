import Image from "next/image";
import Link from "next/link";
import React, { forwardRef, useState, useEffect, useRef } from "react";

const MovieCard = forwardRef(({ data, id }, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [loadTrailer, setLoadTrailer] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Lazy-load the trailer when visible
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadTrailer(true);
          observer.disconnect(); // load only once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const embedUrl =
    data?.trailer && loadTrailer
      ? data.trailer.replace("watch?v=", "embed/") +
        `?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${
          data.trailer.split("v=")[1]
        }`
      : "";

  return (
    <Link href={`/movies/${data?.slug}`} className="movie_card" ref={ref}>
      <div className="movie_img" ref={cardRef}>
        {/* 🔹 Lazy-loaded trailer */}
        {!isMobile && loadTrailer && data?.trailer && (
          <iframe
            src={embedUrl}
            title={`${data?.title} trailer`}
            allow="autoplay; encrypted-media"
            frameBorder="0"
            loading="lazy"
          ></iframe>
        )}

        {/* 🔹 Poster (opacity control for style) */}
        <Image
          width={1000}
          height={1000}
          src={data?.poster}
          alt={data?.title}
        />
      </div>

      <div className="movie_dets">
        <span>{data?.title}</span>
        <span>{data?.year}</span>
      </div>
    </Link>
  );
});

export default MovieCard;
