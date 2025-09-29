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
  useSplitTextMaskAnimation([
    paraRef1,
    paraRef2,
    paraRef3,
    paraRef4,
    paraRef5,
    paraRef6,
    paraRef7,
  ]);
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
          Salman Khan’s latest release, <strong>Sikandar</strong>, has taken the
          box office by storm, becoming the fastest film under{" "}
          <strong>Salman Khan Films (SKF)</strong> to cross{" "}
          <strong>₹300 crore</strong>. Released on Eid 2025, the action-packed
          drama has set new benchmarks for the production house, drawing massive
          crowds across India and overseas.
        </p>

        <p ref={paraRef2} className="description">
          Trade analysts note that <strong>Sikandar</strong> achieved this
          milestone in record time, outpacing previous SKF blockbusters. The
          film’s gripping storyline, high-octane action sequences, and
          chart-topping soundtrack have contributed to its phenomenal run,
          keeping audiences engaged from start to finish.
        </p>

        <p ref={paraRef3} className="description">
          Critics have praised the movie for its compelling narrative and
          well-choreographed action scenes. Salman Khan’s portrayal of the
          titular character has been widely appreciated, balancing intensity
          with emotional depth, which has resonated with fans and newcomers
          alike.
        </p>

        <p ref={paraRef4} className="description">
          Internationally, <strong>Sikandar</strong> has also made waves,
          performing exceptionally well in key overseas markets. Its universal
          themes, combined with high production values, have attracted audiences
          beyond the traditional fan base, making it one of the most successful
          Indian releases of the year abroad.
        </p>

        <p ref={paraRef5} className="description">
          Audience reactions on social media have been overwhelmingly positive.
          Fans are sharing clips, reviews, and favorite moments from the film,
          praising everything from the action sequences to the music and the
          performances. The buzz has made <strong>Sikandar</strong> one of the
          most talked-about films of 2025.
        </p>

        <p ref={paraRef6} className="description">
          Industry experts predict that the film will continue its winning
          streak in the coming weeks. The success of <strong>Sikandar</strong>{" "}
          reinforces SKF’s reputation for producing commercially successful and
          critically acclaimed films, setting a new benchmark for Indian cinema
          this year.
        </p>

        <p ref={paraRef7} className="description">
          With <strong>Sikandar</strong>’s unprecedented success,{" "}
          <strong>Salman Khan Films</strong> is already looking ahead to future
          projects, aiming to deliver high-quality entertainment that continues
          to captivate audiences worldwide.
        </p>
      </div>
    </div>
  );
};

export default NewsDetails;
