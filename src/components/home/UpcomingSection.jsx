import Image from "next/image";
import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const UpcomingSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const container = sectionRef.current;
    const img = container.querySelector("img");

    gsap.fromTo(
      img,
      { yPercent: -3, ease: "none" },
      {
        yPercent: 3,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      }
    );
  }, []);

  return (
    <div id="upcoming_section" ref={sectionRef}>
      <h5 className="tag">Upcoming Release</h5>
      <div id="upcoming_poster">
        <Image width={1000} height={1000} src="/images/home/upcoming-rel.png" alt="upcoming release" />
      </div>
    </div>
  );
};

export default UpcomingSection;
