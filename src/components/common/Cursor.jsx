import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = ({ sectionRef, text = "View more" }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const section = sectionRef?.current;

    // follow pointer (works for drag + touch)
    const moveCursor = (e) => {
      gsap.to(cursor, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.6,
      });
    };

    window.addEventListener("pointermove", moveCursor);

    const handleEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
    };

    const handleLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
    };

    if (section) {
      section.addEventListener("mouseenter", handleEnter);
      section.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      if (section) {
        section.removeEventListener("mouseenter", handleEnter);
        section.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, [sectionRef]);

  return (
    <div
      ref={cursorRef}
      id="cursor"
    >
      {text}
    </div>
  );
};

export default Cursor;
