import React, { useRef, useEffect } from "react";
import NewsDetails from "./NewsDetails";
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase);

const NewsHeroSection = ({ data }) => {
  const router = useRouter();
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const posterRef = useRef(null);

  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  useEffect(() => {
    if (!tagRef.current || !titleRef.current || !posterRef.current) return;

    requestAnimationFrame(() => {
      const tl = gsap.timeline({
        defaults: { ease: "ease-secondary", duration: 1 },
      });

      // Initial states
      gsap.set(tagRef.current, { opacity: 0, y: 30 });
      gsap.set(titleRef.current, { opacity: 0, y: 40 });
      gsap.set(posterRef.current, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      // Animations (same pattern as your working code)
      tl.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      });

      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.4"
      );

      tl.to(
        posterRef.current,
        {
          clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",

          duration: 1,
        },
        "-=0.3"
      );

      return () => tl.kill();
    });
  }, [router.asPath, data]);

  return (
    <div id="news_hero_section">
      <h5 ref={tagRef} className="tag landing_text">
        Highlights
      </h5>
      <h4 ref={titleRef} className="heading landing_text">
        News & Updates
      </h4>

      <div ref={posterRef} id="poster_wrap_news">
        <div className="news_poster">
          <Image
            width={1000}
            height={1000}
            src={data?.image}
            alt={data?.title}
            priority
          />
        </div>
      </div>

      <NewsDetails newsData={data} />
    </div>
  );
};

export default NewsHeroSection;
