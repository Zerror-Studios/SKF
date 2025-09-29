import Image from "next/image";
import Link from "next/link";
import React, { forwardRef, useState, useEffect } from "react";

const MovieCard = forwardRef(({ data, id }, ref) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Link href={`/movies/${data?.slug}`} className="movie_card" ref={ref}>
      <div className="movie_img">
        {!isMobile && (
          <video autoPlay muted loop playsInline src={data?.trailer}></video>
        )}
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
