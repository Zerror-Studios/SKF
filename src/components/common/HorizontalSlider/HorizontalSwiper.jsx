import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { trailers } from "@/helper/trailerData";
import TrailerCard from "./TrailerCard";

const HorizontalSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  return (
    <div id="trailer_section">
      <h2 className="heading">Trailer and Teasers</h2>
      <div id="trailer_swiper_container">
        <Swiper
          effect={"coverflow"}
          grabCursor={false}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={false}
          modules={[EffectCoverflow]}
          className="mySwiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {trailers.map((trailer, index) => (
            <SwiperSlide key={index}>
              <TrailerCard key={trailer.id} trailer={trailer} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div id="trailer_swiper_indicator">
        {trailers.map((trailer, index) => (
          <div
            key={index}
            className={`indicator_card ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => swiperRef.current?.slideTo(index)}
          >
            <Image
              width={1000}
              height={1000}
              src={trailer.poster}
              alt={`trailer-${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalSwiper;
