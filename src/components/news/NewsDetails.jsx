import { formatDate } from "@/utils/formatDate";
import { PortableText } from "next-sanity";
import React, { useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import { LuClock12 } from "react-icons/lu";

const NewsDetails = ({ newsData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link");
    }
  };
  const portableTextComponents = {
    block: {
      normal: ({ children }) => <p className="description">{children}</p>,
    },
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="news_link"
          style={{
            textDecoration: "none",
          }}
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div className="news_info_section">
      <div className="news_title_wrap">
        <p className="news_data">{formatDate(newsData?.publishedAt) || ""}</p>
        <h4 className="heading">{newsData?.title}</h4>

        <div className="news_time">
          <div className="news_time_tab">
            <h5 className="tag">Reading Time</h5>
            <p className="description">
              <LuClock12 /> {newsData?.readingTime}
            </p>
          </div>

          <div className="news_time_tab">
            <h5 className="tag">Share</h5>

            <p className="description share_btn" onClick={handleCopy}>
              <IoShareSocial />
              <span className="share_text">
                {copied ? "Link copied" : "Copy link"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="news_detail_wrap">
        {/* {newsData?.content?.map((p, i) => (
          <p key={i} className="description">
            {p}
          </p>
        ))} */}
        <PortableText
          value={newsData?.content}
          components={portableTextComponents}
        />
      </div>
    </div>
  );
};

export default NewsDetails;
