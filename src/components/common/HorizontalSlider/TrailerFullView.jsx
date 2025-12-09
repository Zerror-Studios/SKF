import React, { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import gsap from "gsap";

const TrailerFullView = ({ item, onClose }) => {
  const popupRef = useRef(null);

  // OPEN ANIMATION
  useEffect(() => {
    gsap.fromTo(
      popupRef.current,
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  // CLOSE ANIMATION
  const handleClose = () => {
    gsap.to(popupRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: onClose,
    });
  };

  const getYouTubeEmbedUrl = (url) => {
    try {
      const parsed = new URL(url);
      const videoId = parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;

      const parts = url.split("/");
      const id = parts[parts.length - 1].split("?")[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    } catch {
      return "";
    }
  };

  const embedUrl = getYouTubeEmbedUrl(item?.url);

  return (
    <div className="trailer_popup_overlay" onClick={handleClose}>
      <button className="popup_close_btn" onClick={handleClose}>
        <FiX />
      </button>

      <div
        className="trailer_popup_content"
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="trailer_iframe_wrapper">
          <iframe
            src={embedUrl}
            title={item?.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerFullView;
