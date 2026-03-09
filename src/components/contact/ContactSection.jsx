import Image from "next/image";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/dist/CustomEase";
import Link from "next/link";
import { useRef, useEffect } from "react";

gsap.registerPlugin(SplitText, CustomEase);

const ContactSection = ({ data }) => {
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const emailTagRef = useRef(null);
  const emailRef = useRef(null);
  const socialRef = useRef(null);
  const iconsRef = useRef(null); // 🔹 icons wrapper ref

  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

  useEffect(() => {
    const splits = [];
    const tl = gsap.timeline({ delay: 0.3 });
    const refs = [heading1Ref, heading2Ref, emailTagRef, emailRef, socialRef];

    const runSplitAnimation = () => {
      refs.forEach((ref, index) => {
        if (!ref?.current) return;

        const split = new SplitText(ref.current, {
          type: "lines",
          mask: "lines",
          linesClass: "line",
        });
        splits.push(split);

        const lines = ref.current.querySelectorAll(".line");

        gsap.set(lines, { yPercent: 100, opacity: 0 });
        gsap.set(ref.current, { opacity: 1 });

        tl.to(
          lines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: "ease-secondary",
            stagger: { amount: 0.2 },
          },
          index === 0 ? 0 : "-=1.1",
        );
      });

      // 🔹 Animate icons after text
      const icons = iconsRef.current?.querySelectorAll("a");
      if (icons?.length) {
        gsap.set(icons, { opacity: 0, scale: 0.6, y: 20 });
        tl.to(
          icons,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "ease-secondary",
            duration: 1,
            stagger: 0.15,
          },
          "-=1.5",
        );
      }
    };

    (document.fonts?.ready || Promise.resolve()).then(() => {
      requestAnimationFrame(() => setTimeout(runSplitAnimation, 50));
    });

    return () => {
      splits.forEach((s) => s.revert());
      tl.kill();
    };
  }, []);

  return (
    <div id="contact_section">
      <div id="contact-top">
        <div>
          <h1 ref={heading1Ref} className="heading landing_text">
            Have an
            <span className="letter-u" style={{ paddingRight: "2px" }}>
              enquiry?
            </span>
          </h1>
          <h2
            ref={heading2Ref}
            className="heading middle_img_wrap landing_text"
          >
            Get in touch with us.
          </h2>
        </div>
        <div>
          <h5 ref={emailTagRef} className="tag landing_text">
            On this Email
          </h5>
          <a
            ref={emailRef}
            className="description landing_text"
            href={`mailto:${data?.email}`}
          >
            {data?.email}
          </a>
        </div>
      </div>
      <div id="contact_bottom">
        <p ref={socialRef} className="description landing_text">
          Follow us on social media:
        </p>
        <div className="contact_social" ref={iconsRef}>
          {data?.twitter && (
            <Link className="landing_text" href={data.twitter} target="_blank">
              <FaXTwitter />
            </Link>
          )}
          {data?.instagram && (
            <Link
              className="landing_text"
              href={data?.instagram}
              target="_blank"
            >
              <FaInstagram />
            </Link>
          )}
          {data?.youtube && (
            <Link className="landing_text" href={data?.youtube} target="_blank">
              <AiOutlineYoutube />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
