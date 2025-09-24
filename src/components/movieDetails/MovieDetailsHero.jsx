import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MovieBanner from "./MovieBanner";
import MovieInfo from "./MovieInfo";
import MovieTrailerVideo from "./MovieTrailerVideo";

const MovieDetailsHero = ({ data }) => {
  const sectionRef = useRef(null);
  const bannerRef = useRef(null);
  const detailsRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    // section reveal
    tl.to(
      sectionRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        duration: 1,
        ease: "power2.inOut", // extra smooth
      },
      "start"
    )

      // banner slide
      .to(
        bannerRef.current,
        { y: "0%", duration: 0.8, ease: "power2.inOut" },
        "start+=0.1"
      )

      // image push
      .to(
        bannerRef.current.querySelector("img"),
        { objectPosition: "50% 50%", duration: 1, ease: "power4.out" },
        "start+=0.2"
      )

      // details rise
      .to(
        detailsRef.current,
        { y: "0%", opacity: 1, duration: 1, ease: "power2.inOut" },
        "start+=0.3"
      );
  }, []);

  return (
    <div id="movie_details_hero">
      <div id="movie_details_wrapper" ref={sectionRef}>
        <MovieBanner
          title={data?.title}
          poster={data?.poster}
          bannerRef={bannerRef}
          setShowVideo={setShowVideo}
        />
        <MovieInfo detailsRef={detailsRef} />
        <MovieTrailerVideo showVideo={showVideo} setShowVideo={setShowVideo} />
      </div>
    </div>
  );
};

export default MovieDetailsHero;
