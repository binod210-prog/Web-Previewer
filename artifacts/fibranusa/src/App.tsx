import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Products from "./components/Products";
import Sustainability from "./components/Sustainability";
import GiftBundles from "./components/GiftBundles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useReveal(page);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav scrolled={scrolled} page={page} setPage={setPage} />
      {page === "home" ? (
        <>
          <Hero setPage={setPage} />
          <Story />
          <Products />
          <Sustainability />
          <Contact />
          <Footer setPage={setPage} />
        </>
      ) : (
        <>
          <GiftBundles />
          <Footer setPage={setPage} />
        </>
      )}
    </div>
  );
}
