import React, { useState, useEffect, useRef } from "react";
import DirectorCard from "./DirectorCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode } from "swiper/modules";
import Cursor from "../Cursor";

const DirectorsContainer = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef()

  useEffect(() => {
    if (window.innerWidth > 1286) {
      setOpenIndex(0);
    }
  }, []);

  const handleOpen = (index) => setOpenIndex(index);
  const handleClose = () => setOpenIndex(null);

  return (
    <div id="directors_container" ref={sectionRef}>
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        spaceBetween={20}
        slidesPerView={"auto"}
        grabCursor={true}
      >
        {data?.map((director, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <DirectorCard
              data={director}
              isOpen={openIndex === index}
              onOpen={() => handleOpen(index)}
              onClose={handleClose}
            />
          </SwiperSlide>
        ))}

        {/* Extra empty space card */}
        <SwiperSlide style={{ width: "20vw" }}></SwiperSlide>
      </Swiper>
      <Cursor sectionRef={sectionRef} text="drag" />

    </div>
  );
};

export default DirectorsContainer;
