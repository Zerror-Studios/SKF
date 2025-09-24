import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { navLinks } from "@/helper/menuData";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import NavigationMenu from "./NavigationMenu";

const Navbar = () => {
  const navRef = useRef(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const splitLetters = (text) =>
    text.split("").map((letter, i) => <span key={i}>{letter}</span>);

  const animateLetters = (selector) => {
    const letters = navRef.current.querySelectorAll(selector);
    gsap.fromTo(
      letters,
      { yPercent: 0 },
      {
        yPercent: -100,
        stagger: { amount: 0.1 },
        duration: 0.3,
        ease: "power2.out",
      }
    );
  };

  const handleHover = (cls) => {
    animateLetters(`.${cls} .title1 span`);
    animateLetters(`.${cls} .title2 span`);
  };

  // ✅ Determine animated routes
  const isDarkRoute = pathname === "/" || pathname?.startsWith("/movies/");

  // ✅ Scroll handler only for animated routes
  useEffect(() => {
    if (!isDarkRoute) return; // no scroll handling for other routes

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.85) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkRoute]);

  // ✅ Navbar styles
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 480);

    checkMobile(); // run once on mount
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navStyle = isDarkRoute
    ? {
        transform: pathname === "/" ? "translateY(-110%)" : "none",
        background: isMobile ? "white" : scrolled ? "white" : "transparent",
        borderBottom: "1px solid",
        borderColor: isMobile
          ? "#d8d8d8"
          : scrolled
          ? "#d8d8d8"
          : "transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }
    : {
        transform: "none",
        background: "white",
        borderBottom: "1px solid #d8d8d8",
        transition: "none",
      };

  const [menu, setMenu] = useState(false);
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
      .fromTo(".menu-links a",{
        opacity:0,
        y:20
      },{
        opacity:1,
        stagger:0.1,
        delay:-.3,
        y:0
      },"s")
       .fromTo(".menu_social_icon svg",{
        opacity:0,
        y:20
      },{
        opacity:1,
        stagger:0.1,
        delay:-.3,
        y:0
      },"s")
       .fromTo([".menu_contact p" ,".menu_contact a"],{
        opacity:0,
        y:20
      },{
        opacity:1,
        stagger:0.1,
        delay:-.3,
        y:0
      },"s")
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

  // ✅ Toggle function remains clean
  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <nav ref={navRef} id="navbar" style={navStyle}>
      <Link id="logo" href="/">
        <Image
          width={1000}
          height={1000}
          src="/images/skf_logo.png"
          alt="skf_logo"
          style={{
            filter: isMobile
              ? "invert(0)" // always normal on mobile
              : isDarkRoute && !scrolled
              ? "invert(1)"
              : "invert(0)",
            transition: "filter 0.6s ease",
          }}
        />
      </Link>

      <div className="nav_links">
        {navLinks.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className={`nav_item ${label}`}
            onMouseEnter={() => handleHover(label)}
            style={{
              color: isDarkRoute && !scrolled ? "#fff" : "#1D1D1D",
              transition: isDarkRoute ? "color 0.6s ease" : "none",
            }}
          >
            <span className="title1">{splitLetters(label)}</span>
            <span className="title2">{splitLetters(label)}</span>
          </Link>
        ))}
      </div>

      <div id="menu-btn" onClick={toggleMenu}>
        <span className="line1m linem"></span>
        <span className="line3m linem"></span>
        <span className="line2m linem"></span>
      </div>
      <NavigationMenu setMenu={setMenu} />
    </nav>
  );
};

export default Navbar;
