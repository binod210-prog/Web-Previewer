import imgCardHolder from "../assets/card-holder.jpeg";
import imgPassport from "../assets/passport.jpeg";

interface HeroProps {
  setPage: (p: string) => void;
}

export default function Hero({ setPage }: HeroProps) {
  return (
    <section
      className="hero-section-pad"
      style={{
        minHeight: "100vh",
        background: "var(--cr)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
        paddingTop: 66,
      }}
    >
      {/* Subtle background blobs */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(196,137,90,.07) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(92,122,90,.06) 0%, transparent 70%)",
      }} />

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px", width: "100%", flex: 1, display: "flex", alignItems: "center" }}>

        {/* Two-column grid: text left, visual right */}
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: 64, alignItems: "center", width: "100%" }}>

          {/* ── LEFT: editorial content */}
          <div className="hero-content">
            <div className="reveal" style={{ marginBottom: 28 }}>
              <span className="pill">🌿 Sustainable Innovation from Nature</span>
            </div>

            <h1
              className="reveal serif hero-h1"
              style={{
                fontSize: "clamp(50px,6.5vw,88px)",
                fontWeight: 300,
                lineHeight: 1.04,
                letterSpacing: "-.02em",
                marginBottom: 24,
                transitionDelay: "80ms",
              }}
            >
              Nature's Luxury,<br />
              <em style={{ color: "var(--ca)", fontStyle: "italic" }}>Reimagined</em>
            </h1>

            <p className="reveal" style={{
              fontSize: 17, lineHeight: 1.8, color: "var(--cbt)",
              maxWidth: 480, marginBottom: 40, transitionDelay: "160ms", fontWeight: 300,
            }}>
              Premium bio-leather crafted from discarded banana sheath fibers — where sustainable innovation meets uncompromising elegance.
            </p>

            <div className="reveal hero-btns" style={{ display: "flex", gap: 14, marginBottom: 56, transitionDelay: "240ms" }}>
              <button className="btn-p"
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>
                <span>Explore Collection</span><span style={{ fontSize: 15 }}>→</span>
              </button>
              <button className="btn-o"
                onClick={() => { setPage("bundles"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <span>Gift Bundles</span>
              </button>
            </div>

            {/* Stats */}
            <div className="reveal hero-stats" style={{ display: "flex", borderTop: "1px solid rgba(44,26,14,.11)", paddingTop: 32, transitionDelay: "320ms" }}>
              {[["100%", "Sustainable"], ["0", "Animal Products"], ["∞", "Possibilities"], ["85%", "Less Water"]].map(([v, l], i) => (
                <div key={i} className="hero-stat-item" style={{
                  flex: 1,
                  paddingRight: 24,
                  borderRight: i < 3 ? "1px solid rgba(44,26,14,.1)" : "none",
                  marginRight: i < 3 ? 24 : 0,
                }}>
                  <div className="serif" style={{ fontSize: "clamp(28px,3vw,44px)", fontWeight: 300, color: "var(--ca)", lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ct)", marginTop: 6, fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: floating product visual */}
          <div className="hero-visual reveal-r" style={{ position: "relative", height: 540 }}>

            {/* Main product card */}
            <div style={{
              position: "absolute", top: "4%", left: "6%", right: 0, bottom: "14%",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
            }}>
              <img src={imgCardHolder} alt="Fibranusa Card Holder"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, transparent 50%, rgba(44,26,14,.55) 100%)",
              }} />
              {/* Bottom label */}
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                <div style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(245,237,227,.6)", marginBottom: 4 }}>Starter Set</div>
                <div className="serif" style={{ fontSize: 20, fontWeight: 400, color: "#F5EDE3" }}>Card Holder + Key Chain</div>
              </div>
            </div>

            {/* Floating passport card — bottom right */}
            <div className="glass" style={{
              position: "absolute", bottom: 0, right: "-6%",
              width: 180, height: 130,
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
              animation: "float 5s ease-in-out infinite",
            }}>
              <img src={imgPassport} alt="Passport Holder"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Floating stat badge — top right */}
            <div className="glass" style={{
              position: "absolute", top: "-2%", right: "-4%",
              borderRadius: "var(--radius-md)",
              padding: "14px 18px",
              animation: "float 7s ease-in-out infinite 1s",
              minWidth: 130,
            }}>
              <div className="serif" style={{ fontSize: 30, fontWeight: 300, color: "var(--ca)", lineHeight: 1 }}>85%</div>
              <div style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ct)", marginTop: 4 }}>Less Water Used</div>
            </div>

            {/* Floating eco badge — left middle */}
            <div className="glass" style={{
              position: "absolute", top: "42%", left: "-8%",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              animation: "float 6s ease-in-out infinite 2s",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "var(--csg)", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, flexShrink: 0,
              }}>🌿</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--cb)" }}>Eco-Certified</div>
                <div style={{ fontSize: 9, color: "var(--ct)", letterSpacing: ".06em" }}>Sustainable materials</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Animated ticker */}
      <div style={{ background: "var(--cb)", padding: "15px 0", overflow: "hidden" }}>
        <div className="marquee-outer">
          <div className="marquee-track">
            {[1, 2].map((n) => (
              <span key={n} className="serif" style={{
                fontSize: 13, color: "rgba(245,237,227,.26)", letterSpacing: ".24em",
                fontWeight: 300, paddingRight: 0, whiteSpace: "nowrap",
              }}>
                BANANA FIBER &nbsp;·&nbsp; BIO-LEATHER &nbsp;·&nbsp; ZERO WASTE &nbsp;·&nbsp; SUSTAINABLE LUXURY &nbsp;·&nbsp; HANDCRAFTED &nbsp;·&nbsp; STARTUP-FRIENDLY &nbsp;·&nbsp; BANANA FIBER &nbsp;·&nbsp; BIO-LEATHER &nbsp;·&nbsp; ZERO WASTE &nbsp;·&nbsp; SUSTAINABLE LUXURY &nbsp;·&nbsp; HANDCRAFTED &nbsp;·&nbsp; STARTUP-FRIENDLY &nbsp;·&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
