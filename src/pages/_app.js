import "@/styles/globals.css";
import "@/styles/components/common/navbar.css";
import "@/styles/components/common/footer.css";
import "@/styles/components/common/button.css";
import "@/styles/components/common/directors.css";
import "@/styles/components/common/gallery.css";
import "@/styles/components/common/horizontalSlider.css";
import "@/styles/components/home.css";
import "@/styles/components/movie.css";
import "@/styles/components/movieDetails.css";
import "@/styles/components/contact.css";
import "@/styles/components/about.css";
import "@/styles/components/news.css";
import Layout from "@/components/layout/Layout";
import SmoothScroller from "@/components/smoothScroll/SmoothScroller";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <SmoothScroller />
      <Component {...pageProps} />
    </Layout>
  );
}
