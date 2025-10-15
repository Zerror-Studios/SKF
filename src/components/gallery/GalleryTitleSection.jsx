import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

const GalleryTitleSection = ({ data, isHero=true }) => {
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const underlineRef = useRef(null); // underline span ref

  useEffect(() => {
    if (!isHero) return; // 🔹 only animate if isHero is true

    const splits = [];
    const tl = gsap.timeline({ delay: 0.3 });
    CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

    const refs = [tagRef, titleRef, descRef];

    const runSplitAnimation = () => {
      refs.forEach((ref, index) => {
        if (!ref?.current) return;

        const split = new SplitText(ref.current, {
          type: "lines",
          mask: "lines",
          linesClass: "line",
        });
        splits.push(split);

        const lines = ref.current.querySelectorAll(".line");

        gsap.set(lines, { yPercent: 100, opacity: 0 });
        gsap.set(ref.current, { opacity: 1 });

        tl.to(
          lines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: "ease-secondary",
            stagger: { amount: 0.2 },
          },
          index === 0 ? 0 : "-=1.1"
        );
      });

    };

    (document.fonts?.ready || Promise.resolve()).then(() => {
      requestAnimationFrame(() => setTimeout(runSplitAnimation, 50));
    });

    return () => {
      splits.forEach((s) => s.revert());
      tl.kill();
    };
  }, [isHero]);

  return (
    <div id="gallery_title" className={`${isHero ? "" : "not-hero"}`}>
      <div className="about_top_wrapper">
        <div className="about_hero_title">
          <h5 ref={tagRef} className="tag landing_text">
            Gallery
          </h5>
          <h2 ref={titleRef} className="heading landing_text">
            {data?.title ? (
              data.title
            ) : (
              <>
                Inside the
                <span ref={underlineRef} className="letter-u">
                  Frame
                </span>
              </>
            )}
          </h2>
        </div>
        <div className="about_hero_info">
          <p ref={descRef} className="description landing_text">
            Explore exclusive moments, unseen footage, and special glimpses from
            the world of SKF
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryTitleSection;
