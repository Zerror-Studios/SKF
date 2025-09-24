import React, { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";
import gsap from "gsap";

const Button = ({ title, color, onClick }) => {
  const btnRef = useRef(null);

  const splitLetters = (text) =>
    text
      .split("")
      .map((letter, i) => (
        <span key={i}>{letter === " " ? "\u00A0" : letter}</span>
      ));

  const animateLetters = (selector) => {
    const letters = btnRef.current.querySelectorAll(selector);
    gsap.fromTo(
      letters,
      { transform: "translateY(0%)" },
      {
        transform: "translateY(-100%)",
        stagger: { amount: 0.1 },
        duration: 0.3,
        ease: "power2.out",
      }
    );
  };

  const handleHover = () => {
    animateLetters(".btn_text .btn_title1 span");
    animateLetters(".btn_text .btn_title2 span");
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      ref={btnRef}
      onMouseEnter={handleHover}
      className={`common_btn ${color}`}
      onClick={handleClick}
    >
      <div className="btn_text">
        <span className="btn_title1">{splitLetters(title)}</span>
        <span className="btn_title2">{splitLetters(title)}</span>
      </div>
      <div className="icon_btn">
        <GoArrowUpRight className="svg1" />
        <GoArrowUpRight className="svg2" />
      </div>
    </button>
  );
};

export default Button;
