import React, { useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Button from "../common/Button";

gsap.registerPlugin(ScrollTrigger);

const Highlights = ({ tag, title, data = [] }) => {
  const cardsRef = useRef([]);
  const triggersRef = useRef([]);
  const lastIndex = useMemo(() => data.length - 1, [data.length]);

  useEffect(() => {
    if (!cardsRef.current) return;

    cardsRef.current.forEach((card) => {
      if (!card) return;

      const tl = gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      triggersRef.current.push(tl.scrollTrigger); // store triggers for cleanup
    });

    return () => {
      // cleanup triggers on unmount
      triggersRef.current.forEach((t) => t && t.kill());
      triggersRef.current = [];
    };
  }, [data]);

  return (
    <section id="highlight_section">
      {tag && <h5 className="tag1">{tag}</h5>}
      {title && <h2>{title}</h2>}

      <div id="highlights_container">
        {data.map((item, index) => {
          const { slug, date, title, description, image } = item || {};
          return (
            <Link
              href={`/news/${slug}`}
              key={slug || index}
              className="highlight_card"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="highlight_info">
                <div className="highlight_info_dets">
                  <p>{date}</p>
                  <h4>{title}</h4>
                  <p className="description">{description}</p>
                </div>
                <Button title="Read More" color="black" />
              </div>

              <div className="highlight_img">
                {image && (
                  <Image
                    priority
                    width={1000}
                    height={1000}
                    src={image}
                    alt={title}
                  />
                )}
              </div>

              {index !== lastIndex && <div className="highlight_line"></div>}
            </Link>
          );
        })}
      </div>

      <div className="btn_container">
        <Button color="black" title="View More" />
      </div>
    </section>
  );
};

export default Highlights;
