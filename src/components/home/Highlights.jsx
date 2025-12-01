import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Button from "../common/Button";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, SplitText);
const Highlights = ({ tag, title, data }) => {
  const cardsRef = useRef([]);

  return (
    <section id="highlight_section">
      {tag && <h5 className="tag">{tag}</h5>}
      {title && <h2>{title}</h2>}

      <div id="highlights_container">
        {data?.map((item, index) => (
          <Link
            href={`/news/${item?.slug}`}
            key={index}
            className="highlight_card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="highlight_info">
              <div className="highlight_info_dets">
                <p>{item?.date}</p>
                <h4>{item?.title}</h4>
                <p className="description">{item?.description}</p>
              </div>
              <Button title="Read More" color="black" />
            </div>

            <div className="highlight_img">
              <Image
                priority
                width={1000}
                height={1000}
                src={item?.image}
                alt={item?.title}
              />
            </div>

            {index !== data?.length - 1 && (
              <div className="highlight_line"></div>
            )}
          </Link>
        ))}
      </div>

      <div className="btn_container">
        <Button color="black" title="view more" />
      </div>
    </section>
  );
};

export default Highlights;
