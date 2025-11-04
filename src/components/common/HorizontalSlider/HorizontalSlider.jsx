import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { trailers } from "@/helper/trailerData";
import TrailerCard from "./TrailerCard";

gsap.registerPlugin(ScrollTrigger);

const HorizontalSlider = ({data}) => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
          snap: {
            snapTo: 1 / 2, // snap points (0, 0.5, 1 for 3 panels)
            duration: { min: 0.2, max: 0.5 },
            ease: "linear",
          },
        },
      });

      // Panel 1 → slides out a bit, panel2 comes into mid-right
      tl.to(panelsRef.current[0], { x: "-50%", rotateY: 40, ease: "linear" });
      tl.fromTo(
        panelsRef.current[1],
        { x: "110%", y: "150%", rotateY: -80 },
        { x: "35%", y: "0%", rotateY: -40, ease: "linear" },
        "<"
      );

      // Panel 1 exits fully, panel2 centers and straightens
      tl.to(panelsRef.current[0], { x: "-120%", rotateY: 70, ease: "linear" });
      tl.to(
        panelsRef.current[1],
        { x: "0%", y: "0%", rotateY: 0, ease: "linear" },
        "<"
      );
      tl.to({}, { duration: 0.08 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <h2 className="heading" id="trailer_heading">
        Trailer and Teasers
      </h2>
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
