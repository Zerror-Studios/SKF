import { navLinks } from "@/helper/menuData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const NavigationMenu = ({menu, setMenu }) => {
  const menuTL = useRef();
  useGSAP(() => {
    menuTL.current = gsap
      .timeline({ paused: true })
      .to(
        ".line1m",
        {
          top: "50%",
          transform: "translateY(-50%)",
          duration: 0.2,
        },
        "a"
      )
      .to(
        ".line2m",
        {
          top: "50%",
          transform: "translateY(-50%)",
          duration: 0.2,
        },
        "a"
      )
      .to(
        ".line1m",
        {
          rotate: 45,
          duration: 0.2,
        },
        "b"
      )
      .to(
        ".line2m",
        {
          rotate: -45,
          duration: 0.2,
        },
        "b"
      )
      .to(
        ".line3m",
        {
          scaleX: 0,
          duration: 0.2,
          delay: -0.1,
        },
        "b"
      )
      .to(
        "#navigation",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.4,
          ease: "power2.out",
        },
        "a"
      )
      .fromTo(
        ".menu-links a",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          stagger: 0.1,
          delay: -0.3,
          y: 0,
        },
        "s"
      )
      .fromTo(
        ".menu_social_icon svg",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          stagger: 0.1,
          delay: -0.3,
          y: 0,
        },
        "s"
      )
      .fromTo(
        ".menu_contact p",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 0.5,
          delay: -0.3,
          y: 0,
        },
        "s"
      )
      .fromTo(
        ".menu_contact a",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          delay: -0.3,
          y: 0,
        },
        "s"
      );
  }, []);

  // ✅ This watches state and runs animation properly
  useEffect(() => {
    if (menuTL.current) {
      if (menu) {
        menuTL.current.play();
      } else {
        menuTL.current.reverse();
      }
    }
  }, [menu]);

  return (
    <div id="navigation">
      <div className="menu-links">
        {navLinks.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className={`${label}`}
            onClick={() => setMenu(false)}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="meun_social">
        <div className="menu_contact">
          <p>contact us</p>
          <Link href="/">salmankhanflims@gmail.com</Link>
        </div>
        <div className="menu_social_icon">
          <FaInstagram />
          <FaFacebookF />
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
