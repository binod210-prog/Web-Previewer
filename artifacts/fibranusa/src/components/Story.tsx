import bananaLeatherImg from "../assets/bio-leather.jpeg";

export default function Story() {
  return (
    <section id="story" className="section-pad" style={{ padding: "120px 40px", background: "var(--cr)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* ── Image column */}
          <div className="reveal-l" style={{ position: "relative" }}>
            {/* Main photo frame */}
            <div style={{
              borderRadius: "var(--radius-xl)",
              height: 520,
              overflow: "hidden",
              background: "#C4895A",
              boxShadow: "var(--shadow-lg)",
              position: "relative",
            }}>
              <img
                src={bananaLeatherImg}
                alt="Banana bio-leather material"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              />
              {/* Bottom gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, transparent 55%, rgba(44,26,14,.45) 100%)",
              }} />
              {/* Eco badge */}
              <div className="glass" style={{
                position: "absolute", bottom: 22, left: 22,
                borderRadius: "var(--radius-md)", padding: "13px 18px",
              }}>
                <div className="serif" style={{ fontSize: 14, color: "var(--ca)", fontWeight: 600 }}>Eco-Certified</div>
                <div style={{ fontSize: 10, color: "var(--ct)", letterSpacing: ".08em", textTransform: "uppercase", marginTop: 2 }}>Sustainable Materials</div>
              </div>
            </div>

            {/* Floating stat card */}
            <div style={{
              position: "absolute", top: -20, right: -24,
              background: "var(--cs)",
              borderRadius: "var(--radius-md)",
              padding: "20px 24px",
              color: "white",
              boxShadow: "var(--shadow-lg)",
              animation: "float 6s ease-in-out infinite",
            }}>
              <div className="serif" style={{ fontSize: 36, fontWeight: 300, lineHeight: 1 }}>85%</div>
              <div style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", opacity: .8, marginTop: 6 }}>Less water</div>
            </div>

            {/* Decorative ring */}
            <div style={{
              position: "absolute", bottom: -20, left: -20,
              width: 100, height: 100,
              borderRadius: "50%",
              border: "2px solid rgba(196,137,90,.2)",
              pointerEvents: "none",
            }} />
          </div>

          {/* ── Text column */}
          <div className="reveal-r">
            <div className="section-eyebrow">Our Story</div>

            <h2 className="serif" style={{
              fontSize: "clamp(36px,4.5vw,58px)",
              fontWeight: 300, lineHeight: 1.1,
              marginBottom: 24, color: "var(--cb)",
            }}>
              From Waste<br />to <em style={{ color: "var(--ca)" }}>Wonder</em>
            </h2>

            {/* Accent line */}
            <div style={{ width: 48, height: 2, background: "var(--ca)", marginBottom: 28, borderRadius: 2 }} />

            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--cbt)", marginBottom: 18, fontWeight: 300 }}>
              Fibranusa was born from a simple observation: billions of banana sheaths are discarded each year, while the fashion industry struggles to find sustainable alternatives to animal leather.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--cbt)", marginBottom: 18, fontWeight: 300 }}>
              Our patented process transforms these agricultural byproducts into a luxurious, durable material that rivals traditional leather — without harming animals or the planet.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--cbt)", marginBottom: 40, fontWeight: 300 }}>
              Each product tells a story of innovation, tradition, and deep respect for our Earth.
            </p>

            {/* Mini stat grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["85%", "Less water usage"], ["Zero", "Harmful chemicals"], ["100%", "Biodegradable"], ["2M+", "Sheaths saved"]].map(([v, l]) => (
                <div key={v} style={{
                  background: "var(--cw)",
                  borderRadius: "var(--radius-md)",
                  padding: "18px 20px",
                  border: "1px solid rgba(44,26,14,.06)",
                  boxShadow: "var(--shadow-xs)",
                  transition: "box-shadow .3s, transform .3s var(--ease-out)",
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-xs)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
                >
                  <div className="serif" style={{ fontSize: 28, fontWeight: 300, color: "var(--ca)", lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 11, color: "var(--ct)", marginTop: 5, letterSpacing: ".05em", fontWeight: 400 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
