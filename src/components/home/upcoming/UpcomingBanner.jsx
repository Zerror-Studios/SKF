import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import WobbleImageMesh from "./WobbleShaderMaterial";
import Image from "next/image";

const UpcomingBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480); // adjust breakpoint as needed
    };

    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageUrl = isMobile
    ? "/images/home/upcoming-banner-mobile.png"
    : "/images/home/upcoming-banner.jpg";

  return (
    <div id="upcoming_banner">
      <Image
        width={1000}
        height={1000}
        priority
        src={imageUrl}
        alt="banner"
        quality={1}
      />
      <div id="canvas_container">
        <h5 className="tag">Upcoming Release</h5>
        <Canvas>
          <WobbleImageMesh imageUrl={imageUrl}/>
        </Canvas>
      </div>
    </div>
  );
};

export default UpcomingBanner;
