import { useState } from "react";

interface NavProps {
  scrolled: boolean;
  page: string;
  setPage: (p: string) => void;
}

export default function Nav({ scrolled, page, setPage }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function scrollTo(id: string) {
    setPage("home");
    setMobileOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function goHome() {
    setPage("home");
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBundles() {
    setPage("bundles");
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const elevated = scrolled || page === "bundles";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: elevated ? "rgba(251,247,242,.97)" : "transparent",
        backdropFilter: elevated ? "blur(18px)" : "none",
        WebkitBackdropFilter: elevated ? "blur(18px)" : "none",
        borderBottom: elevated ? "1px solid rgba(44,26,14,.07)" : "1px solid transparent",
        transition: "background .4s, border-color .4s, backdrop-filter .4s",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 40px",
          height: 66, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer", flexShrink: 0 }}
            onClick={goHome}>
            <div style={{
              width: 34, height: 34, background: "var(--cb)", borderRadius: "var(--radius-sm)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(44,26,14,.18)",
            }}>
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                <path d="M9 2C5.5 2 3 5 3 9c0 3 1.5 5.5 4 6.5M9 2c3.5 0 6 3 6 7 0 3-1.5 5.5-4 6.5M9 2v14M6 5.5C7 7 8 8.5 9 9M12 5.5C11 7 10 8.5 9 9"
                  stroke="#F5EDE3" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="serif" style={{ fontSize: 21, fontWeight: 600, letterSpacing: ".04em", color: "var(--cb)" }}>Fibranusa</span>
          </div>

          {/* Desktop links */}
          <div className="nav-desktop-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {[["Our Story", "story"], ["Products", "products"], ["Sustainability", "sustainability"]] .map(([lbl, id]) => (
              <a key={id} href={`#${id}`} className="nav-link"
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
                {lbl}
              </a>
            ))}
            <button className={`nav-link${page === "bundles" ? " active" : ""}`}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "'Jost',sans-serif" }}
              onClick={goBundles}>
              Gift Bundles
            </button>
            <button className="btn-p" style={{ padding: "10px 24px", fontSize: 11 }}
              onClick={() => scrollTo("contact")}>
              <span>Shop Now</span>
            </button>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className={`nav-hamburger${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-mobile${mobileOpen ? " open" : ""}`}>
        {[["Our Story", "story"], ["Products", "products"], ["Sustainability", "sustainability"]].map(([lbl, id]) => (
          <a key={id} href={`#${id}`} className="nav-mobile-link"
            onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
            {lbl}
          </a>
        ))}
        <button className="nav-mobile-link" onClick={goBundles}>Gift Bundles</button>
        <div style={{ paddingTop: 16 }}>
          <button className="btn-p" style={{ width: "100%", justifyContent: "center" }}
            onClick={() => scrollTo("contact")}>
            <span>Shop Now</span>
          </button>
        </div>
      </div>
    </>
  );
}
