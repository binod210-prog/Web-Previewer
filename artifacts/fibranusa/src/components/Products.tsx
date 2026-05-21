import { PRODUCTS, COLORS } from "../data";

interface ProductCardProps {
  p: typeof PRODUCTS[0];
  delay: number;
}

function ProductCard({ p, delay }: ProductCardProps) {
  const hasTag = Boolean(p.tag);

  return (
    <div className="reveal pcard" style={{ transitionDelay: `${delay}ms` }}>

      {/* ── Image block */}
      <div className="pci" style={{ position: "relative", aspectRatio: "4/3" }}>
        <img
          src={p.photo}
          alt={p.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Tag badge — top-left on image */}
        {hasTag && (
          <div style={{
            position: "absolute", top: 13, left: 13,
            background: "var(--cb)", color: "var(--cr)",
            borderRadius: "var(--radius-sm)",
            padding: "4px 10px",
            fontSize: 9, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase",
            boxShadow: "var(--shadow-sm)", zIndex: 2,
          }}>{p.tag}</div>
        )}

        {/* Heart / wishlist icon — top-right on image, only on tagged products */}
        {hasTag && (
          <button
            aria-label="Save to wishlist"
            style={{
              position: "absolute", top: 10, right: 10, zIndex: 2,
              background: "rgba(251,247,242,.88)",
              border: "none", borderRadius: "50%",
              width: 34, height: 34, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, boxShadow: "var(--shadow-sm)",
              transition: "transform .2s var(--ease-spring)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.12)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
          >🤍</button>
        )}
      </div>

      {/* ── Info block */}
      <div style={{ padding: "18px 20px 22px", background: "var(--cw)" }}>

        {/* Name + price row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
          <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, color: "var(--cb)", lineHeight: 1.25, flex: 1 }}>
            {p.name}
          </h3>
          <div className="serif" style={{ fontSize: 20, fontWeight: 400, color: "var(--ca)", flexShrink: 0, lineHeight: 1.25 }}>
            ${p.basePrice}
          </div>
        </div>

        {/* Subtitle / tagline in sage green */}
        <div style={{ fontSize: 12, color: "var(--cs)", fontWeight: 600, marginBottom: 14, letterSpacing: ".01em" }}>
          {p.shortDesc}
        </div>

        {/* Color swatches */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ct)", marginBottom: 7, fontWeight: 600 }}>
            Color — <span style={{ color: "var(--cb)", textTransform: "none", letterSpacing: 0 }}>Natural</span>
          </div>
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            {COLORS.slice(0, 3).map((c, ci) => (
              <div
                key={ci}
                title={c.name}
                style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: c.hex,
                  border: ci === 0 ? "2px solid var(--cb)" : "2px solid transparent",
                  outline: ci === 0 ? "2px solid rgba(44,26,14,.2)" : "none",
                  outlineOffset: 2,
                  cursor: "default",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 12, color: "var(--ct)", fontWeight: 300, lineHeight: 1.65, marginBottom: 16 }}>
          {p.desc}
        </p>

        {/* VIEW DETAILS link */}
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
          color: "var(--cb)", textDecoration: "underline",
          textDecorationColor: "rgba(44,26,14,.25)", textUnderlineOffset: 3,
          cursor: "default",
        }}>
          View Details →
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <section id="products" className="section-pad" style={{ padding: "120px 40px", background: "var(--cr)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Section header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-eyebrow">Startup-Friendly Sets</div>
          <h2 className="serif" style={{ fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 300, color: "var(--cb)", marginBottom: 16, lineHeight: 1.1 }}>
            Crafted with <em style={{ color: "var(--ca)" }}>Purpose</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ct)", maxWidth: 460, margin: "0 auto", fontWeight: 300, lineHeight: 1.75 }}>
            Four curated sets designed for modern teams. Each piece handcrafted from banana sheath bio-leather, priced for growing companies.
          </p>
        </div>

        {/* Cards grid — 2-col desktop, 1-col mobile */}
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
          {PRODUCTS.map((p, i) => <ProductCard key={p.id} p={p} delay={i * 90} />)}
        </div>
      </div>
    </section>
  );
}
