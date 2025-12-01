import React, { useState, useEffect } from "react";
import Image from "next/image";

const UpcomingBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize(); // initialize once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageUrl = isMobile
    ? "/images/home/upcoming-banner-mobile.png"
    : "/images/home/upcoming-banner.jpg";

  return (
    <div id="upcoming_banner">
      <div id="upcoming_header">
        <p className="tag">Upcoming Release</p>
      </div>
       <Image
          width={1000}
          height={1000}
          priority
          src={imageUrl}
          alt="banner"
        />
    </div>
  );
};

export default UpcomingBanner;
