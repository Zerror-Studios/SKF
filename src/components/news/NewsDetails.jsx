import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import React, { useRef } from "react";
import { IoShareSocial } from "react-icons/io5";
import { LuClock12 } from "react-icons/lu";
const NewsDetails = () => {
      const paraRef1 = useRef(null);
      const paraRef2 = useRef(null);
      const paraRef3 = useRef(null);
      const paraRef4 = useRef(null);
      const paraRef5 = useRef(null);
      const paraRef6 = useRef(null);
      const paraRef7 = useRef(null);
      const paraRef8 = useRef(null);
      const paraRef9 = useRef(null);
      useSplitTextMaskAnimation([paraRef1,paraRef2,paraRef3,paraRef4,paraRef5,paraRef6,paraRef7,paraRef8,paraRef9]);
  return (
    <div className="news_info_section">
      <div className="news_title_wrap">
        <p className="news_data">17 August 2025</p>
        <h4 className="heading">Sikander Creates Box Office Storm</h4>
        <div className="news_time">
          <div className="news_time_tab">
            <h5 className="tag">Reading Time</h5>
            <p className="description">
              <LuClock12 /> 2 Minutes
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
        <p ref={paraRef1} className="description">
          Salman Khan’s Sikandar has stormed the box office, becoming the
          fastest film under Salman Khan Films (SKF) to cross the ₹300 crore
          mark. Released on Eid 2025, the action-packed drama has set new
          benchmarks for the production house, drawing massive crowds both in
          India and overseas
        </p>
        <p ref={paraRef2} className="description">
          Trade analysts note that Sikandar achieved the milestone in record
          time, outpacing previous SKF blockbusters. The film’s gripping
          storyline, high-octane action sequences, and chartbuster music have
          contributed to its phenomenal run.
        </p>
        <p ref={paraRef3} className="description">
          Industry experts predict that Sikandar will continue its winning
          streak in the weeks ahead, solidifying its place as one of the biggest
          hits of 2025.
        </p>
        <p ref={paraRef4} className="description">
          Salman Khan’s Sikandar has stormed the box office, becoming the
          fastest film under Salman Khan Films (SKF) to cross the ₹300 crore
          mark. Released on Eid 2025, the action-packed drama has set new
          benchmarks for the production house, drawing massive crowds both in
          India and overseas
        </p>
        <p ref={paraRef5} className="description">
          Trade analysts note that Sikandar achieved the milestone in record
          time, outpacing previous SKF blockbusters. The film’s gripping
          storyline, high-octane action sequences, and chartbuster music have
          contributed to its phenomenal run.
        </p>
        <p ref={paraRef6} className="description">
          Industry experts predict that Sikandar will continue its winning
          streak in the weeks ahead, solidifying its place as one of the biggest
          hits of 2025.
        </p>
        <p ref={paraRef7} className="description">
          Salman Khan’s Sikandar has stormed the box office, becoming the
          fastest film under Salman Khan Films (SKF) to cross the ₹300 crore
          mark. Released on Eid 2025, the action-packed drama has set new
          benchmarks for the production house, drawing massive crowds both in
          India and overseas
        </p>
        <p ref={paraRef8} className="description">
          Trade analysts note that Sikandar achieved the milestone in record
          time, outpacing previous SKF blockbusters. The film’s gripping
          storyline, high-octane action sequences, and chartbuster music have
          contributed to its phenomenal run.
        </p>
        <p ref={paraRef9} className="description">
          Industry experts predict that Sikandar will continue its winning
          streak in the weeks ahead, solidifying its place as one of the biggest
          hits of 2025.
        </p>
      </div>
    </div>
  );
};

export default NewsDetails;
