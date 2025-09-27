import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import gsap from "gsap";

const DirectorCard = ({ data, isOpen, onOpen, onClose }) => {
  const rightRef = useRef(null);
  const spacerRef = useRef(null);
  const openRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    if (isOpen) {
      // Open animation for this card only
      tl.to(spacerRef.current, { width: "13vw", duration: 1.2 })
        .to(rightRef.current, { opacity: 1, duration: 0.8 }, "<")
        .to(openRef.current, { opacity: 0, duration: 0.8 }, "<")
        .to(closeRef.current, { opacity: 1, duration: 0.8 }, "<");
    } else {
      // Close animation for this card only
      tl.to(spacerRef.current, { width: "0vw", duration: 1.2 })
        .to(rightRef.current, { opacity: 0, duration: 0.8 }, "<")
        .to(openRef.current, { opacity: 1, duration: 0.8 }, "<")
        .to(closeRef.current, { opacity: 0, duration: 0.8 }, "<");
    }
  }, [isOpen]);

  const handleToggle = () => {
    isOpen ? onClose() : onOpen();
  };

  return (
    <div className="director_card" onClick={handleToggle}>
      <div className="director_card_left">
        <div className="director_card_name">
          <span>{data?.name}</span>
          <span ref={openRef}>
            <IoMdAdd />
          </span>
        </div>
        <div className="director_card_img">
          <Image width={1000} height={1000} src={data?.image} alt={data?.name} />
        </div>
        <div className="director_card_right" ref={rightRef}>
          <div className="director_card_name">
            <span></span>
            <span ref={closeRef}>
              <IoMdRemove />
            </span>
          </div>
          <div className="director_card_details">
            <div>
              <h6>Title</h6>
              <h5>Film Director, Screenwriter, Cinematographer</h5>
            </div>
            <p>
              Kabir Khan is a renowned filmmaker known for human-centric stories,
              with films like Bajrangi Bhaijaan, Ek Tha Tiger, and 83.
            </p>
            <div>
              <h6>Awards</h6>
              <p>National Film Award – Bajrangi Bhaijaan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="director_card_spacer" ref={spacerRef}></div>
    </div>
  );
};

export default DirectorCard;
