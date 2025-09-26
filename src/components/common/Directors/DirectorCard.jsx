import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import gsap from "gsap";

const DirectorCard = ({ data, isOpen, onOpen, onClose }) => {
  const rightRef = useRef(null);
  const spacerRef = useRef(null);

useEffect(() => {
  const tl = gsap.timeline();

  if (isOpen) {
    // Open
    tl.to(spacerRef.current, {
      width: "13vw",           // expand
      duration: 1.2,           // longer for smoothness
      ease: "power2.inOut",    // silky smooth
    }).to(
      rightRef.current,
      {
        opacity: 1,
        duration: .8,         // match width
        ease: "power2.inOut",
      },
      "<" // start simultaneously
    );
  } else {
    // Close
    tl.to(spacerRef.current, {
      width: "0vw",            // collapse
      duration: 1.2,
      ease: "power2.inOut",
    }).to(
      rightRef.current,
      {
        opacity: 0,
        duration: .8,
        ease: "power2.inOut",
      },
      "<"
    );
  }
}, [isOpen]);



  return (
    <div className="director_card">
      <div className="director_card_left">
        <div className="director_card_name">
          <span>{data?.name}</span>
          <span
            className="open"
            style={{
              opacity: isOpen ? 0 : 1,
              pointerEvents: isOpen ? "none" : "auto",
            }}
            onClick={onOpen}
          >
            <IoMdAdd />
          </span>
        </div>
        <Image width={1000} height={1000} src={data?.image} alt={data?.name} />
        <div className="director_card_right" ref={rightRef}>
          <div className="director_card_name">
            <span></span>
            <span
              className="close"
              style={{
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
              }}
              onClick={onClose}
            >
              <IoMdRemove />
            </span>
          </div>
          <div className="director_card_details">
            <div>
              <h6>Title</h6>
              <h5>Film Director, Screenwriter, Cinematographer</h5>
            </div>
            <p>
              Kabir Khan is a renowned filmmaker known for human-centric
              stories, with films like Bajrangi Bhaijaan, Ek Tha Tiger, and 83.
            </p>
            <div>
              <h6>Awards</h6> <p>National Film Award – Bajrangi Bhaijaan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="director_card_spacer" ref={spacerRef}></div>
    </div>
  );
};

export default DirectorCard;
