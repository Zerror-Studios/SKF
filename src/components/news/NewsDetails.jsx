import React from "react";
import { IoShareSocial } from "react-icons/io5";
import { LuClock12 } from "react-icons/lu";
const NewsDetails = ({ newsData }) => {
  return (
    <div className="news_info_section">
      <div className="news_title_wrap">
        <p className="news_data">{newsData?.date}</p>
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
            <p className="description">
              <IoShareSocial /> <span id="share">share</span>
            </p>
          </div>
        </div>
      </div>
      <div className="news_detail_wrap">
        {newsData?.content?.map((p, i) => (
          <p key={i} className="description">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};

export default NewsDetails;
