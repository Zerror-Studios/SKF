import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div id="footer_top">
        <h2>
          Creating stories that inspire <br /> and entertain, Write to us{" "}
        </h2>
        <div id="footer_top_right">
          <div className="footer_links">
            <h5>menu</h5>
            <Link href="/">home</Link>
            <Link href="/movies">movies</Link>
            <Link href="/about">about</Link>
            <Link href="/news">news</Link>
            <Link href="/contact">contact</Link>
          </div>
          <div className="footer_links">
            <h5>Socials</h5>
            <div className="footer_social">
              <FaXTwitter />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>
      <div id="footer_bottom">
        <div id="footer_bottom_left">
          <Image
            width={1000}
            height={1000}
            src="/images/footer-logo.png"
            alt="skf-logo"
          />
        </div>
        <div id="footer_bottom_right">
          <p>© 2025 Salman Khan Films. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
