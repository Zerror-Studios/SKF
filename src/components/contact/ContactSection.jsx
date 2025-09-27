import { useEffect, useRef } from "react";
import Image from "next/image";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const ContactSection = () => {
  const titleRef = useRef(null);
  const para1Ref = useRef(null);

  useEffect(() => {
    const splits = [];
    const refs = [titleRef, para1Ref];
    const tl = gsap.timeline();

    const runSplitAnimation = () => {
      // banner animation (faster & smooth)
      tl.to("#contact_banner", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2, // slightly faster
        ease: "power3.out", // smoother
      });

      // text animations
      refs.forEach((ref, index) => {
        if (!ref?.current) return;

        // Split with mask
        const split = new SplitText(ref.current, {
          type: "lines",
          linesClass: "landing-line",
          mask: "lines",
        });
        splits.push(split);

        const lines = ref.current.querySelectorAll(".landing-line");

        // start lines hidden
        gsap.set(lines, { yPercent: 100 });
        gsap.set(ref.current, { opacity: 1 });

        // animate lines overlapping with banner
        tl.to(
          lines,
          {
            yPercent: 0,
            duration: 1.2, // faster
            ease: "power3.out",
            stagger: 0.1, // slightly tighter stagger
          },
          "-=1" // tighter overlap with banner
        );
      });

      // fade in the right info section overlapping with lines
      tl.fromTo(
        ".contact_dets_right_wrap",
        { y: 50 }, // from
        {
          opacity: 1,
          y: 0, // to
          duration: 0.6,
          ease: "power3.out",
        },
        "-=1.5" // overlap with line animation
      );
    };

    // Run after fonts are ready
    const fontReady = document.fonts?.ready || Promise.resolve();
    fontReady.then(() => {
      requestAnimationFrame(() => {
        setTimeout(runSplitAnimation, 50);
      });
    });

    return () => {
      splits.forEach((s) => s.revert());
      tl.kill();
    };
  }, []);

  return (
    <div id="contact_section">
      <div id="contact_info">
        <h2 ref={titleRef} className="heading landing_text">
          Contact Us
        </h2>
        <div className="contact_dets">
          <p ref={para1Ref} className="description landing_text">
            Got a question or want to connect <br /> with the SKF team? We’d
            love to <br />
            hear from you.
          </p>
          <div className="contact_dets_right_wrap landing_text">
            <div className="contact_dets_right">
              <h5 className="tag">General Enquiries</h5>
              <p className="description">info@skf.com</p>
            </div>
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
      </div>
      <div id="contact_banner">
        <Image
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
