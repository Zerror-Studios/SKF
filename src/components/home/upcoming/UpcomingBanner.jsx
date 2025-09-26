import React from "react";
import { Canvas } from "@react-three/fiber";
import WobbleImageMesh from "./WobbleShaderMaterial";
import Image from "next/image";

const UpcomingBanner = () => {
  return (
    <div id="upcoming_banner">
      <Image
        width={1000}
        height={1000}
        priority
        src={"/images/home/upcoming-rel.png"}
        alt="banner"
        quality={1}
      />
      <div id="canvas_container">
        <h5 className="tag">Upcoming Release</h5>
        <Canvas>
          <WobbleImageMesh />
        </Canvas>
      </div>
    </div>
  );
};

export default UpcomingBanner;
