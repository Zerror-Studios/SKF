import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../common/Button";
import { formatDate } from "@/utils/formatDate";

const Highlights = ({ tag, title, data = [], isHero = false }) => {
  const lastIndex = useMemo(() => data.length - 1, [data.length]);

  return (
    <section id="highlight_section" className={`${isHero ? "isHero" : ""}`}>
      {tag && <h5 className="tag1">{tag}</h5>}
      {title && <h2>{title}</h2>}

      <div id="highlights_container">
        {data.map((item, index) => {
          const { slug, publishedAt, title, description, image } = item || {};
          return (
            <Link
              href={`/news/${slug}`}
              key={slug || index}
              className="highlight_card"
            >
              <div className="highlight_info">
                <div className="highlight_info_dets">
                  <p>{formatDate(publishedAt) || ""}</p>
                  <h4>{title}</h4>
                  <p className="description">{description}</p>
                </div>
                <Button title="Read More" color="black" />
              </div>

              <div className="highlight_img">
                {image && (
                  <Image
                    src={image}
                    alt={image?.alt || title}
                    width={1280}
                    height={720}
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 665px"
                  />
                )}
              </div>

              {index !== lastIndex && <div className="highlight_line"></div>}
            </Link>
          );
        })}
      </div>

      {!isHero && (
        <div className="btn_container">
          <Link href="/news">
            <Button color="black" title="View More" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default Highlights;
