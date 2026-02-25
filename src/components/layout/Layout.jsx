import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  const router = useRouter();
  const isStudioRoute = router.pathname.startsWith("/studio");

  useEffect(() => {
    if (isStudioRoute) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [isStudioRoute]);

  return (
    <>
      {!isStudioRoute && <Navbar />}
      {children}
      {!isStudioRoute && <Footer />}
    </>
  );
};

export default Layout;