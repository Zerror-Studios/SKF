import React, { useRef, useEffect } from "react";
import AboutPoster from "./AboutPoster";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

const AboutHeroSection = ({ data }) => {

  const tagRef = useRef(null);
  const titleRef = useRef(null);
  // const para1Ref = useRef(null);
  // const para2Ref = useRef(null);
  // const para3Ref = useRef(null);
  const posterRef = useRef(null);
  const officeRef = useRef(null); // new ref for office_label
  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  useEffect(() => {
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

        tl.to(
          lines,
          {
            yPercent: 0,
            duration: 1.5,
            ease: "ease-secondary",
            stagger: { amount: 0.2 },
          },
          index === 0 ? 0 : "-=1.5",
        );
      });

      if (officeRef.current) {
        tl.fromTo(
          officeRef.current,
          { y: 20, opacity: 0 },
          { opacity: 1, y: 0, duration: 1.2, ease: "ease-secondary" },
          "-=1.5",
        );
      }

      if (posterRef.current) {
        tl.to(
          posterRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 2,
            ease: "ease-secondary",
          },
          "-=2",
        );
      }
    };

    (document.fonts?.ready || Promise.resolve()).then(() => {
      requestAnimationFrame(() => setTimeout(runSplitAnimation, 50));
    });

    return () => {
      splits.forEach((s) => s.revert());
      tl.kill();
    };
  }, []);

  return (
    <div id="about_hero_section">
      <div className="about_top_wrapper">
        <div className="about_hero_title">
          <h5 ref={tagRef} className="tag1 landing_text">
            About
          </h5>
          <h1 ref={titleRef} className="heading landing_text">
            {data?.title}
          </h1>
        </div>
        <div className="about_hero_info">
          {data?.description &&
            data.description.map((p, i) => (
              <p key={i} className="description">
                {p}
              </p>
            ))}
          <div ref={officeRef} className="office_label landing_text">
            <div>
              <h5 className="tag">Head Office</h5>
              <h2 className="heading">{data?.headOffice}</h2>
            </div>
            <div>
              <h5 className="tag">Total Movies</h5>
              <h2 className="heading">{data?.totalMovies}+</h2>
            </div>
          </div>
        </div>
      </div>
      <div ref={posterRef} id="poster_wrap_about">
        <AboutPoster banner={data?.banner} alt={data?.bannerAlt} />
      </div>
    </div>
  );
};

export default AboutHeroSection;
