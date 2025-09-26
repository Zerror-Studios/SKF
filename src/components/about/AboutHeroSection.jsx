import React, { useRef } from "react";
import AboutPoster from "./AboutPoster";
import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";

const AboutHeroSection = () => {
    const titleRef = useRef(null);
    const para1Ref = useRef(null);
    const para2Ref = useRef(null);
    useSplitTextMaskAnimation([titleRef,para1Ref,para2Ref]);
  return (
    <div id="about_hero_section">
      <div className="about_top_wrapper">
        <div className="about_hero_title">
          <h5 className="tag">About</h5>
          <h2 ref={titleRef} className="heading">
            Where Stories Meet <br /> Heart
          </h2>
        </div>
        <div className="about_hero_info">
          <p ref={para1Ref} className="description">
            Salman Khan Films (SKF), founded by actor-producer Salman Khan in
            2011, is a leading Indian film production company based in Mumbai.
          </p>
          <p ref={para2Ref} className="description">
            Known for its compelling storytelling, wide audience appeal, and
            high production values, SKF has delivered several blockbuster and
            critically acclaimed titles that continue to perform strongly across
            digital platforms.
          </p>
          <div className="office_label">
            <div>
              <h5 className="tag">Head Office</h5>
              <h2 className="heading">Mumbai</h2>
            </div>
            <div>
              <h5 className="tag">Total Movies</h5>
              <h2 className="heading">10+</h2>
            </div>
          </div>
        </div>
      </div>
      <AboutPoster/>
    </div>
  );
};

export default AboutHeroSection;
