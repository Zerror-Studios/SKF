import Image from "next/image";
import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactSection = () => {
  return (
    <div id="contact_section">
      <div id="contact_info">
        <h2 className="heading">Contact Us</h2>
        <div className="contact_dets">
          <p className="description">
            Got a question or want to connect <br /> with the SKF team? We’d love to <br />
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
