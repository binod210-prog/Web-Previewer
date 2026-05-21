import { useState } from "react";
import { SITE_CONFIG } from "../config/siteConfig";
import { validateContactForm } from "../lib/validation";

type ContactFormFields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: string;
  message: string;
};

const EMPTY_FORM: ContactFormFields = {
  name: "",
  email: "",
  phone: "",
  company: "",
  inquiryType: SITE_CONFIG.inquiryTypes[0],
  message: "",
};

const CONTACT_ICONS: Record<string, string> = {
  Email:     "✉",
  WhatsApp:  "💬",
  Instagram: "📸",
  Location:  "📍",
};

export default function Contact() {
  const [form, setForm] = useState<ContactFormFields>(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function updateField(field: keyof ContactFormFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError("");
  }

  function submitContactForm() {
    const validation = validateContactForm({
      name: form.name,
      email: form.email,
      message: form.message,
      phone: form.phone,
      company: form.company,
    });
    if (!validation.valid) {
      setFormError(validation.error);
      return;
    }
    setFormError("");
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSent(true); }, 700);
  }

  const { contact, certification } = SITE_CONFIG;

  // Contact detail rows matching reference: Email, WhatsApp, Instagram, Location
  const contactDetails = [
    { label: "Email",     val: contact.email },
    { label: "WhatsApp",  val: contact.whatsapp },
    { label: "Instagram", val: contact.instagram },
    { label: "Location",  val: contact.location },
  ];

  return (
    <section id="contact" className="section-pad" style={{ padding: "120px 40px", background: "var(--cr)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Section header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-eyebrow">Contact</div>
          <h2 className="serif" style={{ fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 300, color: "var(--cb)", marginBottom: 16, lineHeight: 1.1 }}>
            Let's Start a <em style={{ color: "var(--ca)" }}>Conversation</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ct)", maxWidth: 420, margin: "0 auto", fontWeight: 300, lineHeight: 1.75 }}>
            Product questions, wholesale partnerships, or custom orders — we'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 64 }}>

          {/* ── Left: contact details */}
          <div>
            {contactDetails.map(({ label, val }) => (
              <div key={label} style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                marginBottom: 24, paddingBottom: 24,
                borderBottom: "1px solid rgba(44,26,14,.08)",
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "var(--radius-sm)",
                  background: "var(--cw)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 16, flexShrink: 0,
                  border: "1px solid rgba(44,26,14,.07)",
                }}>
                  {CONTACT_ICONS[label]}
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--ca)", marginBottom: 4, fontWeight: 600 }}>{label}</div>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 300, color: "var(--cb)" }}>{val}</div>
                </div>
              </div>
            ))}

            {/* B Corp badge */}
            <div style={{
              background: "rgba(92,122,90,.08)",
              borderRadius: "var(--radius-md)",
              padding: "20px",
              borderLeft: "3px solid var(--cs)",
              boxShadow: "var(--shadow-xs)",
            }}>
              <div className="serif" style={{ fontSize: 15, fontWeight: 400, color: "var(--cs)", marginBottom: 5 }}>{certification.title}</div>
              <p style={{ fontSize: 12, color: "var(--cbt)", lineHeight: 1.7, fontWeight: 300 }}>{certification.description}</p>
            </div>
          </div>

          {/* ── Right: contact form */}
          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "56px 20px" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🌿</div>
              <h3 className="serif" style={{ fontSize: 28, fontWeight: 300, color: "var(--cb)", marginBottom: 10 }}>Thank you</h3>
              <p style={{ fontSize: 14, color: "var(--ct)", fontWeight: 300, lineHeight: 1.7 }}>We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Row 1: Name + Email */}
              <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {([
                  { label: "Name",  field: "name"  as const, type: "text",  ph: "Jane Doe" },
                  { label: "Email", field: "email" as const, type: "email", ph: "jane@example.com" },
                ] as const).map((f) => (
                  <div key={f.label}>
                    <label style={{ display: "block", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ct)", marginBottom: 7, fontWeight: 600 }}>{f.label}</label>
                    <input className="ifield" type={f.type} placeholder={f.ph}
                      value={form[f.field]} onChange={(e) => updateField(f.field, e.target.value)} />
                  </div>
                ))}
              </div>

              {/* Row 2: Phone + Company */}
              <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ct)", marginBottom: 7, fontWeight: 600 }}>Phone / WhatsApp</label>
                  <input className="ifield" type="tel" placeholder="+65 8xxx xxxx"
                    value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ct)", marginBottom: 7, fontWeight: 600 }}>Company</label>
                  <input className="ifield" type="text" placeholder="Your company"
                    value={form.company} onChange={(e) => updateField("company", e.target.value)} />
                </div>
              </div>

              {/* Inquiry type */}
              <div>
                <label style={{ display: "block", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ct)", marginBottom: 7, fontWeight: 600 }}>Inquiry Type</label>
                <select className="ifield" style={{ appearance: "none" as const, cursor: "pointer" }}
                  value={form.inquiryType} onChange={(e) => updateField("inquiryType", e.target.value)}>
                  {SITE_CONFIG.inquiryTypes.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: "block", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ct)", marginBottom: 7, fontWeight: 600 }}>Message</label>
                <textarea className="ifield" rows={5}
                  placeholder="Tell us about your inquiry, quantity, timeline…"
                  style={{ resize: "vertical" }}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)} />
              </div>

              {formError && (
                <p style={{ fontSize: 12, color: "#C0392B", fontWeight: 400 }}>{formError}</p>
              )}

              {/* CTA — "Send Enquiry" matching reference */}
              <button
                className="btn-p"
                onClick={submitContactForm}
                disabled={submitting}
                style={{ marginTop: 4, width: "100%", justifyContent: "center", opacity: submitting ? 0.6 : 1 }}
              >
                <span>{submitting ? "Sending…" : "Send Enquiry"}</span>
                {!submitting && <span>→</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
