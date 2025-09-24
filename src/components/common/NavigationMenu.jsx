import { navLinks } from "@/helper/menuData";
import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const NavigationMenu = ({ setMenu }) => {
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
        <div className="menu_social_icon">
          <FaInstagram />
          <FaYoutube />
        </div>
        <Link href="/">salmankhanflims@gmail.com</Link>
      </div>
    </div>
  );
};

export default NavigationMenu;
