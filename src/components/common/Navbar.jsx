import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { navLinks } from "@/helper/menuData";
import { usePathname } from "next/navigation";
import NavigationMenu from "./NavigationMenu";
import { useRouter } from "next/router";

const Navbar = () => {
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const splitLetters = (text) => text.split("").map((l, i) => <span key={i}>{l}</span>);

  const animateLetters = (selector) => {
    gsap.fromTo(
      navRef.current.querySelectorAll(selector),
      { yPercent: 0 },
      { yPercent: -100,  stagger: { amount: 0.1 }, duration: 0.3, ease: "power2.out" }
    );
  };

  const handleHover = (cls) => {
    animateLetters(`.${cls} .title1 span`);
    animateLetters(`.${cls} .title2 span`);
  };

  const isDarkRoute = pathname === "/" || pathname === "/contact" || pathname.startsWith("/movies/");

  useEffect(() => {
    if (!isDarkRoute) return;
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkRoute]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 480);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navStyle = isDarkRoute
    ? {
        transform: pathname === "/" ? "translateY(-110%)" : "none",
        background: isMobile || scrolled ? "white" : "transparent",
        borderBottom: "1px solid",
        borderColor: isMobile || scrolled ? "#d8d8d8" : "transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }
    : { transform: "none", background: "white", borderBottom: "1px solid #d8d8d8" };

  return (
    <nav ref={navRef} id="navbar" style={navStyle}>
      <Link id="logo" href="/">
        <Image
          width={1000}
          height={1000}
          src="/images/skf_logo.png"
          alt="skf_logo"
          style={{
            filter:
              pathname === "/contact" || isMobile
                ? "invert(0)"
                : isDarkRoute && !scrolled
                ? "invert(1)"
                : "invert(0)",
            transition: "filter 0.6s ease",
          }}
        />
      </Link>

      <div className="nav_links">
        {navLinks.map(({ href, label }) => {
          const isActive = href === "/" ? router.pathname === href : router.pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              className={`nav_item ${label} ${isActive ? "active" : ""} ${
                isDarkRoute && !scrolled ? "dark" : ""
              }`}
              onMouseEnter={() => handleHover(label)}
              style={{
                color: isDarkRoute && !scrolled ? "#fff" : "#1D1D1D",
                transition: isDarkRoute ? "color 0.6s ease" : "none",
              }}
            >
              <span className="title1">{splitLetters(label)}</span>
              <span className="title2">{splitLetters(label)}</span>
            </Link>
          );
        })}
      </div>

      <div id="menu-btn" onClick={() => setMenu((prev) => !prev)}>
        <span className="line1m linem"></span>
        <span className="line3m linem"></span>
        <span className="line2m linem"></span>
      </div>

      <NavigationMenu menu={menu} setMenu={setMenu} />
    </nav>
  );
};

export default Navbar;
