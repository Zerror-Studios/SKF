import ContactSection from "@/components/contact/ContactSection";
import SeoHeader from "@/components/seo/SeoHeader";
import { getContact } from "@/lib/contact";
import React from "react";

const Contact = ({ meta, contact }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <ContactSection data={contact} />
    </>
  );
};

export default Contact;

export async function getStaticProps() {
  const meta = {
    title: "Contact Us | Salman Khan Films",
    description:
      "Get in touch with Salman Khan Films for official business enquiries, media relations, partnerships, and professional communication.",
    keywords:
      "Contact Salman Khan Films, SKF enquiries, film production contact, Bollywood studio contact",
    author: "Salman Khan Films",
    robots: "index,follow",
  };

  const [contact] = await Promise.all([getContact()]);

  return {
    props: {
      meta,
      contact,
    },
    revalidate: 60,
  };
}
