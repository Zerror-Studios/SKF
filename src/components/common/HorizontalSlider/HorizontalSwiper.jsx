import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import TrailerCard from "./TrailerCard";
import TrailerFullView from "./TrailerFullView";

const extractId = (url) => url?.split("v=")[1]?.split("&")[0];

const HorizontalSwiper = ({ data }) => {
  const swiperRef = useRef(null);

  // Popup
  const [activeIndex, setActiveIndex] = useState(null);

  // Build trailer list
  const trailerList = [
    data?.trailer
      ? { title: data?.title, url: data.trailer, type: "trailer" }
      : null,
    data?.teaser
      ? { title: data?.title, url: data.teaser, type: "teaser" }
      : null,
  ].filter(Boolean);

  if (trailerList.length === 0) return null;

  return (
    <>
      <div id="trailer_section">
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
              slideShadows: false,
            }}
            modules={[EffectCoverflow]}
            className="mySwiper"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {trailerList.map((item, index) => (
              <SwiperSlide key={index}>
                <TrailerCard
                  item={item}
                  index={index}
                  onClick={() => setActiveIndex(index)} // open popup
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* indicator thumbnails */}
        <div id="trailer_swiper_indicator">
          {trailerList.map((item, index) => (
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
                src={`https://img.youtube.com/vi/${extractId(
                  item.url,
                )}/hqdefault.jpg`}
                alt={`trailer-${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Popup view */}
      {activeIndex !== null && (
        <TrailerFullView
          item={trailerList[activeIndex]}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
};

export default HorizontalSwiper;
