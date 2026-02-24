import { menus } from "@/helper/menuData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
gsap.registerPlugin(CustomEase);

const NavigationMenu = ({ menu, setMenu }) => {
  const menuTL = useRef();
  CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

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
        "a",
      )
      .to(
        ".line2m",
        {
          top: "50%",
          transform: "translateY(-50%)",
          duration: 0.2,
        },
        "a",
      )
      .to(
        ".line1m",
        {
          rotate: 45,
          duration: 0.2,
        },
        "b",
      )
      .to(
        ".line2m",
        {
          rotate: -45,
          duration: 0.2,
        },
        "b",
      )
      .to(
        ".line3m",
        {
          scaleX: 0,
          duration: 0.2,
          delay: -0.1,
        },
        "b",
      )
      .to(
        "#navigation",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.6,
          ease: "ease-secondary",
        },
        "a",
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
          delay: -0.5,
          duration: 1,
          y: 0,
          ease: "ease-secondary",
        },
        "s",
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
          delay: -0.5,
          duration: 0.8,
          y: 0,
          ease: "ease-secondary",
        },
        "s",
      )
      .fromTo(
        ".menu_contact p",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 0.5,
          delay: -0.5,
          duration: 0.8,
          y: 0,
          ease: "ease-secondary",
        },
        "s",
      )
      .fromTo(
        ".menu_contact a",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          delay: -0.5,
          duration: 0.8,
          y: 0,
          ease: "ease-secondary",
        },
        "s",
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
        {menus.map(({ link, name, external }) =>
          external ? (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${name}`}
              onClick={() => setMenu(false)}
            >
              {name}
            </a>
          ) : (
            <Link
              key={name}
              href={link}
              className={`${name}`}
              onClick={() => setMenu(false)}
            >
              {name}
            </Link>
          ),
        )}
      </div>
      <div className="meun_social">
        <div className="menu_contact">
          <p>contact us</p>
          <Link href="/">salmankhanflims@gmail.com</Link>
        </div>
        <div className="menu_social_icon">
          <Link href="https://x.com/skfilmsofficial?s=21" target="_blank">
            <FaXTwitter />
          </Link>
          <Link
            href="https://www.instagram.com/skfilmsofficial?igsh=MmU0MXh5M28xZHlw"
            target="_blank"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://youtube.com/@salmankhanfilms?si=t5TS1bnfuDtDWRpR"
            target="_blank"
          >
            <AiOutlineYoutube />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
