import React from "react";
import CastCard from "./CastCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CastSection = ({ data }) => {
  return (
    <section id="cast_section">
      <div className="cast_tag_wrap">
        <h2 className="tag1">Cast and crew</h2>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        grabCursor={true}
      >
        {data?.cast?.map((cast, index) => (
          <SwiperSlide
            key={index}
          >
           <CastCard data={cast} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CastSection;
