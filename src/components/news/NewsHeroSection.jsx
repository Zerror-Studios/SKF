import React, { useRef, useEffect } from "react";
import NewsPoster from "./NewsPoster";
import NewsDetails from "./NewsDetails";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(SplitText,CustomEase);

const NewsHeroSection = () => {
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const posterRef = useRef(null); // add ref to NewsPoster container
    CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  useGSAP(() => {
    const splits = [];
    const tl = gsap.timeline();

    const refs = [tagRef, titleRef];

    const runSplitAnimation = () => {
      refs.forEach((ref, index) => {
        if (!ref?.current) return;

        const split = new SplitText(ref.current, {
          type: "lines",
          linesClass: "line",
          mask: "lines",
        });
        splits.push(split);

        const lines = ref.current.querySelectorAll(".line");

        gsap.set(lines, { yPercent: 100 });
        gsap.set(ref.current, { opacity: 1 });

        // Animate lines faster and fluid
        tl.to(
        lines,
        {
          yPercent: 0,
          duration: 1.5,
          ease: "ease-secondary",
          stagger: { amount: 0.2 },
        },
        index === 0 ? 0 : "-=1.5"
      );
    });

      // Poster animation overlapping more for continuous flow
      if (posterRef.current) {
        tl.to(
          posterRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "ease-secondary",
          },
          "-=1" // overlap with last line
        );
      }
    };

    const fontReady = document.fonts?.ready || Promise.resolve();
    fontReady.then(() => {
      requestAnimationFrame(() => {
        setTimeout(runSplitAnimation, 50);
      });
    });

    return () => {
      splits.forEach((s) => s.revert());
      tl.kill();
    };
  }, []);

  return (
    <div id="news_hero_section">
      <h5 ref={tagRef} className="tag landing_text">
        News
      </h5>
      <h4 ref={titleRef} className="heading landing_text">
        Latest News and <br /> Updates
      </h4>
      <div ref={posterRef} id="poster_wrap_news">
        <NewsPoster />
      </div>
      <NewsDetails />
    </div>
  );
};

export default NewsHeroSection;
