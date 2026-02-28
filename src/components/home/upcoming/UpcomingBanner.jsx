// components/home/upcoming/UpcomingBanner.jsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const UpcomingBanner = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data) return null;

  const bannerImage =
    isMobile && data.mobileBanner ? data.mobileBanner : data.desktopBanner;

  return (
    <div id="upcoming_banner">
      <div id="upcoming_header">
        <h2 className="heading">
          Upcoming <span className="letter-u">Release</span>
        </h2>
      </div>

      <Image
        src={urlFor(bannerImage).url()}
        alt={bannerImage?.alt || data.movieTitle}
        width={1600}
        height={800}
        priority
      />
    </div>
  );
};

export default UpcomingBanner;
