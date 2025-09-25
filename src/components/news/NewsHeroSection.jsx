import Image from "next/image";
import React from "react";
import { IoShareSocial } from "react-icons/io5";
import { LuClock12 } from "react-icons/lu";

const NewsHeroSection = () => {
  return (
    <div id="news_hero_section">
      <h5 className="tag">News</h5>
      <h4 className="heading">
        Latest News and <br /> Updates
      </h4>
      <div className="news_poster">
        <Image
          width={1000}
          height={1000}
          src="/images/news/news-banner.png"
          alt="contact-banner"
        />
      </div>
      <div className="news_info_section">
        <div className="news_title_wrap">
          <p className="news_data">17 August 2025</p>
          <h4 className="heading">Sikander Creates Box Office Storm</h4>
          <div className="news_time">
            <div className="news_time_tab">
              <h5 className="tag">Reading Time</h5>
              <p className="description"><LuClock12 /> 2 Minutes</p>
            </div>
            <div className="news_time_tab">
              <h5 className="tag">Share</h5>
              <p className="description"><IoShareSocial /> <span id="share">share</span></p>
            </div>
          </div>
        </div>
        <div className="news_detail_wrap">
          <p className="description">
            Salman Khan’s Sikandar has stormed the box office, becoming the
            fastest film under Salman Khan Films (SKF) to cross the ₹300 crore
            mark. Released on Eid 2025, the action-packed drama has set new
            benchmarks for the production house, drawing massive crowds both in
            India and overseas
          </p>
          <p className="description">
            Trade analysts note that Sikandar achieved the milestone in record
            time, outpacing previous SKF blockbusters. The film’s gripping
            storyline, high-octane action sequences, and chartbuster music have
            contributed to its phenomenal run.
          </p>
          <p className="description">
            Industry experts predict that Sikandar will continue its winning
            streak in the weeks ahead, solidifying its place as one of the
            biggest hits of 2025.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsHeroSection;
