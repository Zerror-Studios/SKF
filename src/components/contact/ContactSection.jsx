import { useSplitTextMaskAnimation } from "@/utils/useSplitTextMaskAnimation";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
gsap.registerPlugin(ScrollTrigger);
const ContactSection = () => {
  const bgRef = useRef(null);
    const titleRef = useRef(null);
      const para1Ref = useRef(null);
      useSplitTextMaskAnimation([titleRef,para1Ref]);

  useEffect(() => {
    if (!bgRef.current) return;

    const tl = gsap.fromTo(
      bgRef.current,
      { y: "0%" },
      {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: "#about_section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Refresh ScrollTrigger after images in the section load
    const images = document.querySelectorAll("#about_section img");
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        ScrollTrigger.refresh(); // recalc positions
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    return () => {
      images.forEach((img) => img.removeEventListener("load", handleImageLoad));
      tl.scrollTrigger?.kill();
    };
  }, []);
  return (
    <div id="contact_section">
      <div id="contact_info">
        <h2 ref={titleRef} className="heading">Contact Us</h2>
        <div className="contact_dets">
          <p ref={para1Ref} className="description">
            Got a question or want to connect <br /> with the SKF team? We’d
            love to <br />
            hear from you.
          </p>
          <div className="contact_dets_right">
            <h5 className="tag">General Enquiries</h5>
            <p className="description">info@skf.com</p>
          </div>
        </div>
        <div className="contact_dets">
          <div className="contact_dets_right">
            <h5 className="tag">Socials</h5>
            <div className="contact_social">
              <FaXTwitter />
              <FaInstagram />
              <AiOutlineYoutube />
            </div>
          </div>
        </div>
      </div>
      <div id="contact_banner">
        <Image
        ref={bgRef}
          width={1000}
          height={1000}
          src="/images/contact/contact-banner.jpg"
          alt="contact-banner"
        />
      </div>
    </div>
  );
};

export default ContactSection;
