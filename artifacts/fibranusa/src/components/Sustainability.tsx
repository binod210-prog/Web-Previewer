import { SUSTAIN } from "../data";

export default function Sustainability() {
  return (
    <section id="sustainability" className="section-pad" style={{
      padding: "120px 40px",
      background: "var(--cb)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "-25%", right: "-12%",
        width: "55vw", height: "55vw", maxWidth: 640, maxHeight: 640,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,137,90,.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

        {/* Section header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="section-eyebrow">Sustainability</div>
          <h2 className="serif" style={{
            fontSize: "clamp(36px,4.5vw,58px)",
            fontWeight: 300, color: "var(--cr)", marginBottom: 16, lineHeight: 1.1,
          }}>
            Every <em style={{ color: "var(--ca)" }}>Step</em>
          </h2>
          <p style={{
            fontSize: 15, color: "rgba(245,237,227,.46)",
            maxWidth: 460, margin: "0 auto", fontWeight: 300, lineHeight: 1.75,
          }}>
            From farm to finished product, every decision is made with the planet in mind.
          </p>
        </div>

        {/* 3-column principle grid */}
        <div
          className="sustain-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}
        >
          {SUSTAIN.map((s, i) => (
            <div
              key={s.label}
              className="reveal"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div
                style={{
                  background: "rgba(245,237,227,.05)",
                  border: "1px solid rgba(245,237,227,.09)",
                  borderRadius: "var(--radius-md)",
                  padding: "32px 28px",
                  height: "100%",
                  transition: "background .3s, border-color .3s, transform .3s var(--ease-out)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "rgba(196,137,90,.08)";
                  el.style.borderColor = "rgba(196,137,90,.22)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "rgba(245,237,227,.05)";
                  el.style.borderColor = "rgba(245,237,227,.09)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div style={{ fontSize: 30, marginBottom: 18, lineHeight: 1 }}>{s.icon}</div>
                {/* Title */}
                <h3 className="serif" style={{
                  fontSize: 20, fontWeight: 400, color: "var(--cr)",
                  lineHeight: 1.25, marginBottom: 12,
                }}>{s.label}</h3>
                {/* Description */}
                <p style={{
                  fontSize: 13, lineHeight: 1.75,
                  color: "rgba(245,237,227,.48)", fontWeight: 300,
                }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
