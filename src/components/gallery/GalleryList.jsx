import React, { useEffect, useRef } from "react";
import GalleryCard from "./GalleryCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Button from "../common/Button";
gsap.registerPlugin(ScrollTrigger);

const GalleryList = ({ data, movieSlug, hasMoviePage }) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    const cards = galleryRef.current.querySelectorAll(".gallery_wrap");
    gsap.set(cards, { y: 80, opacity: 0 });

    const playAnimation = () => {
      return gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      });
    };

    // Check if already in view on load
    const rect = galleryRef.current.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    let st; // store ScrollTrigger instance

    if (inView) {
      playAnimation();
    } else {
      st = ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top 80%",
        onEnter: () => playAnimation(),
        once: true,
      });
    }

    return () => {
      if (st) st.kill();
    };
  }, [data]);

  return (
    <div id="gallery_list" ref={galleryRef}>
      {data.map((item) => {
        const href = movieSlug
          ? `/gallery/${movieSlug}/${item.slug}`
          : `/gallery/${item.slug}`;

        return (
          <GalleryCard
            key={item.slug}
            slug={href}
            title={item.title}
            cover={item.cover}
            data={item}
          />
        );
      })}
      {hasMoviePage && (
        <div
          style={{
            width: "100%",
            gridColumn: "1 / -1",
          }}
        >
          <Link href={`/movies/${movieSlug}`}>
            <Button title="Know More" color="black" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default GalleryList;
