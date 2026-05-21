import { SITE_CONFIG } from "../config/siteConfig";

interface FooterProps {
  setPage: (p: string) => void;
}

const COL_HEAD: React.CSSProperties = {
  fontSize: 9,
  letterSpacing: ".22em",
  textTransform: "uppercase",
  color: "var(--ca)",
  fontWeight: 700,
  marginBottom: 22,
  fontFamily: "var(--sans)",
};

const LINK_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  color: "rgba(245,237,227,.42)",
  textDecoration: "none",
  marginBottom: 13,
  fontWeight: 300,
  lineHeight: 1.4,
  fontFamily: "var(--sans)",
  transition: "color .18s, padding-left .18s",
  cursor: "pointer",
};

const CONTACT_ROW: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  marginBottom: 14,
};

const CONTACT_ICON: React.CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 6,
  background: "rgba(196,137,90,.12)",
  border: "1px solid rgba(196,137,90,.18)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  flexShrink: 0,
  marginTop: 1,
};

const CONTACT_TEXT: React.CSSProperties = {
  fontSize: 13,
  color: "rgba(245,237,227,.55)",
  fontFamily: "var(--sans)",
  fontWeight: 300,
  lineHeight: 1.45,
  wordBreak: "break-all",
};

function NavLink({ label }: { label: string }) {
  return (
    <div>
      <a
        href="#"
        style={LINK_STYLE}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.color = "rgba(245,237,227,.9)";
          el.style.paddingLeft = "5px";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.color = "rgba(245,237,227,.42)";
          el.style.paddingLeft = "0";
        }}
      >
        {label}
      </a>
    </div>
  );
}

export default function Footer({ setPage: _setPage }: FooterProps) {
  const { companyName, tagline, copyrightYear, footerNav, legalLinks, contact } = SITE_CONFIG;

  return (
    <footer style={{ background: "var(--cb)", padding: "80px 48px 40px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>

        {/* ── Main grid ── */}
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.2fr",
          gap: 56,
          marginBottom: 56,
          paddingBottom: 48,
          borderBottom: "1px solid rgba(245,237,227,.07)",
          alignItems: "start",
        }}>

          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 38, height: 38,
                background: "linear-gradient(135deg, var(--ca) 0%, #a86c3a 100%)",
                borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 17, flexShrink: 0,
              }}>🌿</div>
              <span className="serif" style={{
                fontSize: 19, fontWeight: 600,
                color: "var(--cr)", letterSpacing: ".05em",
              }}>{companyName}</span>
            </div>

            <p style={{
              fontSize: 12.5, color: "rgba(245,237,227,.35)",
              lineHeight: 1.85, maxWidth: 220,
              fontWeight: 300, fontFamily: "var(--sans)", marginBottom: 28,
            }}>
              {tagline}
            </p>

            {/* Social pill buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "IG", title: "Instagram" },
                { label: "WA", title: "WhatsApp" },
                { label: "LI", title: "LinkedIn" },
              ].map(({ label, title }) => (
                <a key={label} href="#" title={title} style={{
                  width: 34, height: 34, borderRadius: 7,
                  background: "rgba(245,237,227,.05)",
                  border: "1px solid rgba(245,237,227,.09)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, letterSpacing: ".06em",
                  color: "rgba(245,237,227,.35)",
                  textDecoration: "none",
                  fontFamily: "var(--sans)",
                  transition: "background .18s, color .18s, border-color .18s",
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(196,137,90,.16)";
                    el.style.borderColor = "rgba(196,137,90,.32)";
                    el.style.color = "var(--ca)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(245,237,227,.05)";
                    el.style.borderColor = "rgba(245,237,227,.09)";
                    el.style.color = "rgba(245,237,227,.35)";
                  }}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Company + Products nav columns */}
          {footerNav.map(({ title, links }) => (
            <div key={title}>
              <div style={COL_HEAD}>{title}</div>
              {links.map((l) => <NavLink key={l} label={l} />)}
            </div>
          ))}

          {/* Connect column — actual contact details */}
          <div>
            <div style={COL_HEAD}>Connect</div>

            <div style={CONTACT_ROW}>
              <div style={CONTACT_ICON}>📸</div>
              <div>
                <div style={{ ...CONTACT_TEXT, color: "rgba(245,237,227,.7)", fontWeight: 500, fontSize: 12 }}>Instagram</div>
                <a href="https://instagram.com/fibranusa_" target="_blank" rel="noreferrer"
                  style={{ ...CONTACT_TEXT, textDecoration: "none", fontSize: 12 }}>
                  {contact.instagram}
                </a>
              </div>
            </div>

            <div style={CONTACT_ROW}>
              <div style={CONTACT_ICON}>💬</div>
              <div>
                <div style={{ ...CONTACT_TEXT, color: "rgba(245,237,227,.7)", fontWeight: 500, fontSize: 12 }}>WhatsApp</div>
                <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"
                  style={{ ...CONTACT_TEXT, textDecoration: "none", fontSize: 12 }}>
                  {contact.whatsapp}
                </a>
              </div>
            </div>

            <div style={CONTACT_ROW}>
              <div style={CONTACT_ICON}>✉️</div>
              <div>
                <div style={{ ...CONTACT_TEXT, color: "rgba(245,237,227,.7)", fontWeight: 500, fontSize: 12 }}>Email</div>
                <a href={`mailto:${contact.email}`}
                  style={{ ...CONTACT_TEXT, textDecoration: "none", fontSize: 11, wordBreak: "break-all" }}>
                  {contact.email}
                </a>
              </div>
            </div>

            <div style={CONTACT_ROW}>
              <div style={CONTACT_ICON}>📍</div>
              <div>
                <div style={{ ...CONTACT_TEXT, color: "rgba(245,237,227,.7)", fontWeight: 500, fontSize: 12 }}>Location</div>
                <div style={{ ...CONTACT_TEXT, fontSize: 12 }}>{contact.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: 11, color: "rgba(245,237,227,.16)", fontWeight: 300, fontFamily: "var(--sans)" }}>
            © {copyrightYear} {companyName}. All rights reserved. Made with intention.
          </p>
          <div style={{ display: "flex", gap: 22 }}>
            {legalLinks.map((l) => (
              <a key={l} href="#" style={{
                fontSize: 10, color: "rgba(245,237,227,.16)",
                textDecoration: "none", letterSpacing: ".07em",
                fontWeight: 300, fontFamily: "var(--sans)",
                transition: "color .18s",
              }}
                onMouseEnter={(e) => { (e.currentTarget).style.color = "rgba(245,237,227,.45)"; }}
                onMouseLeave={(e) => { (e.currentTarget).style.color = "rgba(245,237,227,.16)"; }}
              >{l}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
