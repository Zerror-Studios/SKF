import React, { useRef, useEffect } from "react";
import AboutPoster from "./AboutPoster";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

const AboutHeroSection = () => {
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const para3Ref = useRef(null);
  const posterRef = useRef(null);
  const officeRef = useRef(null); // new ref for office_label
  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  useEffect(() => {
    const splits = [];
    const tl = gsap.timeline();
    const refs = [tagRef, titleRef, para1Ref, para2Ref, para3Ref];

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
          index === 0 ? 0 : "-=1.5"
        );
      });

      if (officeRef.current) {
        tl.fromTo(
          officeRef.current,
          { y: 20, opacity: 0 },
          { opacity: 1, y: 0, duration: 1.2, ease: "ease-secondary" },
          "-=1.5"
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
          "-=2"
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
          <h5 ref={tagRef} className="tag landing_text">
            About
          </h5>
          <h2 ref={titleRef} className="heading landing_text">
            Bringing Stories to Life One Blockbuster at a Time
          </h2>
        </div>
        <div className="about_hero_info">
          <p ref={para1Ref} className="description landing_text">
            Salman Khan Films (SKF), founded by actor-producer Salman Khan in
            2011, is a leading Indian film production company based in Mumbai.
            Known for its compelling storytelling, wide audience appeal, and
            high production values, SKF has delivered several blockbuster and
            critically acclaimed titles that continue to perform strongly across
            digital platforms.
          </p>
          <p ref={para2Ref} className="description landing_text">
            Its filmography includes hits such as Bajrangi Bhaijaan (2015), Hero
            (2015), Bharat (2019), and Dabangg 3 (2019). Among these, Bajrangi
            Bhaijaan emerged as a landmark title, grossing over ₹969 crore
            (approximately $150 million) worldwide and securing its place as one
            of the highest-grossing Indian films of all time.
          </p>
          <p ref={para3Ref} className="description landing_text">
            SKF’s content blends star power with strong emotional narratives,
            making its films highly sought after for OTT syndication and
            streaming. With a growing focus on theatrical and direct-to-digital
            releases, SKF continues to play a significant role in shaping modern
            Hindi cinema while consistently delivering engaging, family-friendly
            entertainment that resonates with audiences across demographics and
            geographies
          </p>
          <div ref={officeRef} className="office_label landing_text">
            <div>
              <h5 className="tag">Head Office</h5>
              <h2 className="heading">Mumbai</h2>
            </div>
            <div>
              <h5 className="tag">Total Movies</h5>
              <h2 className="heading">10+</h2>
            </div>
          </div>
        </div>
      </div>
      <div ref={posterRef} id="poster_wrap_about">
        <AboutPoster />
      </div>
    </div>
  );
};

export default AboutHeroSection;
