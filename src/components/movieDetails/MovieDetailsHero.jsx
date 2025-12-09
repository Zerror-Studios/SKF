import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MovieBanner from "./MovieBanner";
import MovieInfo from "./MovieInfo";
import TrailerFullView from "../common/HorizontalSlider/TrailerFullView";

const MovieDetailsHero = ({ data }) => {
  const sectionRef = useRef(null);
  const bannerRef = useRef(null);
  const detailsRef = useRef(null);

  const [activeTrailer, setActiveTrailer] = useState(null);

  const openTrailer = () => {
    setActiveTrailer({
      title: data?.title || "Trailer",
      url: data?.trailer,
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(
      sectionRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        duration: 1,
      },
      "start"
    )
      .to(bannerRef.current, { y: "0%", duration: 0.8 }, "start+=0.1")
      .to(
        bannerRef.current.querySelector("img"),
        { objectPosition: "50% 50%", duration: 1, ease: "power4.out" },
        "start+=0.2"
      )
      .to(
        detailsRef.current,
        { y: "0%", opacity: 1, duration: 1 },
        "start+=0.3"
      );
  }, []);

  return (
    <>
      <div id="movie_details_hero">
        <div id="movie_details_wrapper" ref={sectionRef}>
          <MovieBanner
            title={data?.title}
            poster={data?.poster}
            bannerRef={bannerRef}
            setShowVideo={openTrailer}
          />
          <MovieInfo info={data} detailsRef={detailsRef} />
        </div>
      </div>
      {/* Popup */}
      {activeTrailer && (
        <TrailerFullView
          item={activeTrailer}
          onClose={() => setActiveTrailer(null)}
        />
      )}
    </>
  );
};

export default MovieDetailsHero;
