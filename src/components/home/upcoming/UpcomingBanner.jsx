import React, { useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const UpcomingBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // adjust breakpoint as needed
    };

    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageUrl = isMobile
    ? "/images/home/upcoming-banner-mobile.png"
    : "/images/home/upcoming-banner.jpg";

  useGSAP(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#upcoming_banner",
          start: "top top",
          end: window.innerHeight * 4,
          pin: true,
          scrub: true,
          // markers: true
        },
      });

      tl.fromTo("#expand_line", { width: "0%" }, { width: "100%" });
      tl.fromTo(
        "#image_banner img",
        { transform: "translateY(-100%)" },
        { transform: "translateY(0%)" }
      );

      return () => {
        tl.kill();
      };
    });

    return () => ctx.revert(); // cleanup gsap context
  }, []);

  return (
    <div id="upcoming_banner">
      <div id="upcoming_header">
        <p className="tag">Upcoming</p>
        <div id="expand_line">
          <div id="image_banner">
            <Image
              width={1000}
              height={1000}
              priority
              src={imageUrl}
              alt="banner"
            />
          </div>
        </div>
        <p className="tag">Release</p>
      </div>
    </div>
  );
};

export default UpcomingBanner;
