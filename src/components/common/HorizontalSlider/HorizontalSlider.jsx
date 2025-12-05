import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import TrailerCard from "./TrailerCard";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

// Fetch YouTube title + date
const fetchVideoMeta = async (url) => {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${url}&format=json`;
    const res = await fetch(oembedUrl);
    const data = await res.json();

    return {
      title: data.title || "No title available",
      date: data.upload_date || "Unknown date",
    };
  } catch (err) {
    return {
      title: "Unknown title",
      date: "Unknown date",
    };
  }
};

const extractId = (url) => url.split("v=")[1]?.split("&")[0];

const HorizontalSlider = ({ data }) => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  const [trailers, setTrailers] = useState([]);
  const router = useRouter();

  // Build trailers array
  const buildTrailersArray = async (movie) => {
    const arr = [];

    // If teaser exists
    if (movie.teaser) {
      const teaserMeta = await fetchVideoMeta(movie.teaser);
      arr.push({
        id: arr.length + 1,
        title: teaserMeta.title,
        type: "Teaser",
        iframeUrl: `https://www.youtube.com/embed/${extractId(movie.teaser)}`,
      });
    }

    // If trailer exists
    if (movie.trailer) {
      const trailerMeta = await fetchVideoMeta(movie.trailer);
      arr.push({
        id: arr.length + 1,
        title: trailerMeta.title,
        type: "Trailer",
        iframeUrl: `https://www.youtube.com/embed/${extractId(movie.trailer)}`,
      });
    }

    return arr; // if neither exists → returns empty array
  };

  // Load metadata once
  useEffect(() => {
    const loadTrailers = async () => {
      const arr = await buildTrailersArray(data);
      setTrailers(arr);
    };
    loadTrailers();
  }, [data]);

  useEffect(() => {
    const handleRouteChange = () => {
      ScrollTrigger.getAll().forEach((st) => st.kill(true));
      gsap.globalTimeline.clear();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  // GSAP animation only after trailers exist
  useEffect(() => {
    if (!trailers || trailers.length < 2) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
          snap: {
            snapTo: 1 / 2,
            duration: { min: 0.2, max: 0.5 },
            ease: "linear",
          },
        },
      });

      tl.to(panelsRef.current[0], { x: "-50%", rotateY: 40, ease: "linear" });
      tl.fromTo(
        panelsRef.current[1],
        { x: "110%", y: "150%", rotateY: -80 },
        { x: "35%", y: "0%", rotateY: -40, ease: "linear" },
        "<"
      );

      tl.to(panelsRef.current[0], { x: "-120%", rotateY: 70, ease: "linear" });
      tl.to(
        panelsRef.current[1],
        { x: "0%", y: "0%", rotateY: 0, ease: "linear" },
        "<"
      );
    }, containerRef);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(panelsRef.current);
      ctx.revert();
    };
  }, [trailers, router.asPath]);

  return (
    <>
      <div className="trailer_title">
        <p className="tag1">TRAILERS AND TEASERS</p>
        <h2 className="heading">
          Cinematic <span className="letter-u"> Glimpse</span>
        </h2>
      </div>

      <div className="trailer_slider" ref={containerRef}>
        {trailers.map((trailer, index) => (
          <TrailerCard
            key={trailer.id}
            trailer={trailer}
            index={index}
            panelsRef={panelsRef}
          />
        ))}
      </div>
    </>
  );
};

export default HorizontalSlider;
