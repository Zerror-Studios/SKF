import Image from "next/image";
import React from "react";

const AboutHeroSection = () => {
  return (
    <div id="about_hero_section">
      <div className="about_top_wrapper">
        <div className="about_hero_title">
          <h5 className="tag">About</h5>
          <h2 className="heading">
            Where Stories Meet <br /> Heart
          </h2>
        </div>
        <div className="about_hero_info">
          <p className="description">
            Salman Khan Films (SKF), founded by actor-producer Salman Khan in
            2011, is a leading Indian film production company based in Mumbai.
          </p>
          <p className="description">
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
     <div className="about_banner">
         <Image
        width={1000}
        height={1000}
        src="/images/about/about-banner.png"
        alt="contact-banner"
      />
     </div>
    </div>
  );
};

export default AboutHeroSection;
