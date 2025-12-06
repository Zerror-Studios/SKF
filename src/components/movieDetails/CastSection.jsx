import React from "react";
import CastCard from "./CastCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CastSection = ({ data }) => {
  return (
    <section id="cast_section">
      <div className="cast_tag_wrap">
        <h2 className="heading">Cast <span className="letter-u">and</span> crew</h2>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={6.2}
        grabCursor={true}
        breakpoints={{
          0: { slidesPerView: 1.6, spaceBetween: 12 },
          480: { slidesPerView: 2.2, spaceBetween: 16 },
          768: { slidesPerView: 3.2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {data?.cast?.map((cast, index) => (
          <SwiperSlide key={index}>
            <CastCard data={cast} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <Button title="show more" color="black" /> */}
    </section>
  );
};

export default CastSection;
