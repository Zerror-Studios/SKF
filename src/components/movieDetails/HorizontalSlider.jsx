import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HorizontalSlider = () => {
  const containerRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);
  const panel3Ref = useRef(null);

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
      tl.to(panel1Ref.current, { x: "-50%", rotateY: 40, ease: "linear" });
      tl.fromTo(
        panel2Ref.current,
        { x: "110%", y: "150%", rotateY: -80 },
        { x: "35%", y: "0%", rotateY: -40, ease: "linear" },
        "<"
      );

      // Panel 1 exits fully, panel2 centers and straightens
      tl.to(panel1Ref.current, { x: "-120%", rotateY: 70, ease: "linear" });
      tl.to(
        panel2Ref.current,
        { x: "0%", y: "0%", rotateY: 0, ease: "linear" },
        "<"
      );
      tl.to({}, { duration: 0.08 });

      // Panel 2 → slides out a bit, panel3 comes into mid-right
      tl.to(panel2Ref.current, { x: "-50%", rotateY: 40, ease: "linear" });
      tl.fromTo(
        panel3Ref.current,
        { x: "110%", y: "150%", rotateY: -80 },
        { x: "35%", y: "0%", rotateY: -40, ease: "linear" },
        "<"
      );

      // Panel 2 exits fully, panel3 centers and straightens
      tl.to(panel2Ref.current, { x: "-120%", rotateY: 70, ease: "linear" });
      tl.to(
        panel3Ref.current,
        { x: "0%", y: "0%", rotateY: 0, ease: "linear" },
        "<"
      );
      tl.to({}, { duration: 0.08 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="trailer_slider" ref={containerRef}>
      <div className="trailer_panel trailer_panel1" ref={panel1Ref}>
        <div className="trailer_panel_poster">
          <Image
          width={1000}
          height={1000}
          src="/images/moviedetails/trailer1.png"
          alt={`traile-img`}
        />
        </div>
        <div className="trailer_panel_info">
          <p>SIKANDAR Official Trailer - Salman Khan, Rashmika | Sajid Nadiadwala | A.R. Murugadoss</p>
          <p>30th March</p>
        </div>
      </div>
      <div className="trailer_panel trailer_panel2" ref={panel2Ref}>
        <div className="trailer_panel_poster">
          <Image
          width={1000}
          height={1000}
          src="/images/moviedetails/trailer2.png"
          alt={`traile-img`}
        />
        </div>
        <div className="trailer_panel_info">
          <p>FARREY Official Trailer | Salman Khan | Alizeh | Soumendra Padhi </p>
          <p>24th November</p>
        </div>
      </div>
      <div className="trailer_panel trailer_panel3" ref={panel3Ref}>
         <div className="trailer_panel_poster">
          <Image
          width={1000}
          height={1000}
          src="/images/moviedetails/trailer3.png"
          alt={`traile-img`}
        />
        </div>
        <div className="trailer_panel_info">
          <p>SIKANDAR Official Trailer - Salman Khan, Rashmika | Sajid Nadiadwala | A.R. Murugadoss</p>
          <p>30th March</p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSlider;
