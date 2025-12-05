import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import TrailerCard from "./TrailerCard";

const fetchVideoMeta = async (url) => {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${url}&format=json`;
    const res = await fetch(oembedUrl);
    const data = await res.json();

    return {
      title: data.title || "No title available",
      date: data.upload_date || "Unknown date",
    };
  } catch (err) {
    return {
      title: "Unknown title",
      date: "Unknown date",
    };
  }
};

const extractId = (url) => url.split("v=")[1]?.split("&")[0];

const HorizontalSwiper = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [trailers, setTrailers] = useState([]);
  // Build trailers array
const buildTrailersArray = async (movie) => {
  const arr = [];

  // If teaser exists
  if (movie.teaser) {
    const teaserMeta = await fetchVideoMeta(movie.teaser);
    arr.push({
      id: arr.length + 1,
      title: teaserMeta.title,
      type: "",
      poster: `https://img.youtube.com/vi/${extractId(movie.teaser)}/hqdefault.jpg`,
      iframeUrl: `https://www.youtube.com/embed/${extractId(movie.teaser)}`,
    });
  }

  // If trailer exists
  if (movie.trailer) {
    const trailerMeta = await fetchVideoMeta(movie.trailer);
    arr.push({
      id: arr.length + 1,
      title: trailerMeta.title,
      type: "",
      poster: `https://img.youtube.com/vi/${extractId(movie.trailer)}/hqdefault.jpg`,
      iframeUrl: `https://www.youtube.com/embed/${extractId(movie.trailer)}`,
    });
  }

  return arr; // if neither exists → returns empty array
};

  // Load metadata once
  useEffect(() => {
    const loadTrailers = async () => {
      const arr = await buildTrailersArray(data);
      setTrailers(arr);
    };
    loadTrailers();
  }, [data]);

  return (
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
          pagination={false}
          modules={[EffectCoverflow]}
          className="mySwiper"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {trailers?.map((trailer, index) => (
            <SwiperSlide key={index}>
              <TrailerCard key={trailer.id} trailer={trailer} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div id="trailer_swiper_indicator">
        {trailers?.map((trailer, index) => (
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
              src={trailer?.poster}
              alt={`trailer-${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalSwiper;
