import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import TrailerCard from "./TrailerCard";
import TrailerFullView from "./TrailerFullView";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HorizontalSlider = ({ data }) => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  const [activeIndex, setActiveIndex] = useState(null);

  const trailerList = [
    data?.trailer
      ? { title: data?.title, url: data.trailer, type: "trailer" }
      : null,
    data?.teaser
      ? { title: data?.title, url: data.teaser, type: "teaser" }
      : null,
  ].filter(Boolean);

  if (trailerList.length === 0) return null;

  // GSAP Animation
  useGSAP(() => {
    if (!containerRef.current || trailerList.length < 2) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%",
        scrub: 1,
        pin: true,
        snap: {
          snapTo: 1 / (trailerList.length - 1),
          duration: { min: 0.2, max: 0.5 },
          ease: "linear",
        },
      },
    });

    tl.to(panelsRef.current[0], {
      x: "-50%",
      rotateY: 40,
      ease: "linear",
    });

    tl.fromTo(
      panelsRef.current[1],
      { x: "110%", y: "150%", rotateY: -80 },
      { x: "35%", y: "0%", rotateY: -40, ease: "linear" },
      "<"
    );

    tl.to(panelsRef.current[0], {
      x: "-120%",
      rotateY: 70,
      ease: "linear",
    });

    tl.to(
      panelsRef.current[1],
      { x: "0%", y: "0%", rotateY: 0, ease: "linear" },
      "<"
    );
  }, [trailerList.length]);

  return (
    <>
      <div className="trailer_title">
        <p className="tag1">TRAILERS AND TEASERS</p>
        <h2 className="heading">
          Cinematic <span className="letter-u"> Glimpse</span>
        </h2>
      </div>

      <div className="trailer_slider" ref={containerRef}>
        {trailerList.map((item, index) => (
          <TrailerCard
            key={index}
            item={item}
            index={index}
            panelsRef={panelsRef}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <TrailerFullView
          item={trailerList[activeIndex]}   // pass single item
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
};

export default HorizontalSlider;
