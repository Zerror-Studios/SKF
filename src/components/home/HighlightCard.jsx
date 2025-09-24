import React, { useEffect, useRef } from "react";
import Button from "../common/Button";
import Image from "next/image";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HighlightCard = ({ data, isLast }) => {
  const paraRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const lineRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useSplitTextMaskAnimation([paraRef, titleRef, descriptionRef]);

  useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current, // trigger on card
        start: "top 70%", // adjust for when animation should start
        toggleActions: "play none none none",
      },
    });

    // Animate image scale
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 1.2 },
        { scale: 1, duration: 1, ease: "power3.out" }
      );
    }

    // Animate line width
    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { width: 0 },
        { width: "100%", duration: 1, ease: "power3.out", delay: 0.5 },
        "<" // start at the same time as image animation
      );
    }

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

useEffect(() => {
  if (!cardRef.current) return;

  // Create a GSAP MatchMedia instance
  const mm = gsap.matchMedia();

  mm.add("(max-width: 480px)", () => {
    // Highlight card when scrolled into view
    const tlHighlight = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 70%",
        end: "bottom 65%",
        scrub: true,
      },
    });

    tlHighlight.to(cardRef.current, {
      backgroundColor: "#a5a08c",
      ease: "linear",
      duration: 0.3,
    });

    // Reset card when it leaves
    const tlReset = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "bottom 55%",
        end: "bottom 50%",
        scrub: true,
      },
    });

    tlReset.to(cardRef.current, {
      backgroundColor: "#fffef1",
      ease: "linear",
      duration: 0.3,
    });

    // Cleanup function for this media query
    return () => {
      tlHighlight.kill();
      tlHighlight.scrollTrigger?.kill();
      tlReset.kill();
      tlReset.scrollTrigger?.kill();
    };
  });

  // Cleanup all matchMedia triggers on unmount
  return () => {
    mm.revert();
  };
}, []);

  return (
    <div className="highlight_card" ref={cardRef}>
      <div className="highlight_info">
        <div className="highlight_info_dets">
          <p ref={paraRef}>{data?.date}</p>
          <h4 ref={titleRef}>{data?.title}</h4>
          <p ref={descriptionRef} className="description">
            {data?.description}
          </p>
        </div>
        <Button title="Read More" color={"black"} />
      </div>
      <div className="highlight_img">
        <Image
          priority
          ref={imageRef}
          width={1000}
          height={1000}
          src={data?.image}
          alt={data?.title}
        />
      </div>
      {!isLast && <div ref={lineRef} className="highlight_line"></div>}
    </div>
  );
};

export default HighlightCard;
