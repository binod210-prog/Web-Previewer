import { useState } from "react";
import { COLORS, BUNDLE_PRODUCTS } from "../data";
import { IllustNotebook, IllustSunglasses } from "./Illustrations";
import {
  type BundleSelection,
  VOLUME_TIERS,
  calculateEngravingFee,
  calculateUnitPrice,
  calculateLineTotal,
  calculateBundleSubtotal,
  countTotalBundleUnits,
  getVolumeDiscount,
  calculateBundleFinalPrice,
} from "../lib/bundlePricing";
import {
  validateQuoteRequest,
  validatePreorderSignup,
  sanitizeEngravingText,
} from "../lib/validation";

const PREORDER_PRODUCTS = [
  {
    id: "nb",
    name: "Banana Fiber Notebook",
    tag: "Q3 2026",
    desc: "A premium A5 notebook with a banana fiber cover. Blank, lined, or dotted interior. Sustainable stationery for intentional creatives.",
    estPrice: "$28–$36",
    bg: "#E8D9C8",
    IllustSVG: IllustNotebook,
  },
  {
    id: "sg",
    name: "Bio-Leather Sunglasses Case",
    tag: "Q4 2026",
    desc: "A slim, magnetically-sealed case for your eyewear. Soft interior lining, rigid enough to protect, elegant enough to display.",
    estPrice: "$22–$30",
    bg: "#DDD0BE",
    IllustSVG: IllustSunglasses,
  },
];

const VOLUME_DISCOUNT_PILLS = VOLUME_TIERS.filter((t) => t.discount > 0).map((t) => ({
  label: `${t.min}+ units`,
  value: `${Math.round(t.discount * 100)}% off`,
}));

export default function GiftBundlesPage() {
  const [tab, setTab] = useState<"bundle" | "preorder">("bundle");
  const [bundleSelections, setBundleSelections] = useState<Record<string, BundleSelection>>({});
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteEmailError, setQuoteEmailError] = useState("");
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [preorderEmails, setPreorderEmails] = useState<Record<string, string>>({});
  const [preorderErrors, setPreorderErrors] = useState<Record<string, string>>({});
  const [preorderSubmitted, setPreorderSubmitted] = useState<Record<string, boolean>>({});

  function updateBundleSelection(
    productId: string,
    field: keyof BundleSelection,
    value: number | string,
  ) {
    setBundleSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: field === "engrave" ? sanitizeEngravingText(value as string) : value,
      },
    }));
  }

  function submitQuoteRequest() {
    const validation = validateQuoteRequest(quoteEmail);
    if (!validation.valid) {
      setQuoteEmailError(validation.error);
      return;
    }
    setQuoteEmailError("");
    setQuoteSubmitting(true);
    setTimeout(() => {
      setQuoteSubmitting(false);
      setQuoteSubmitted(true);
    }, 600);
  }

  function submitPreorderSignup(productId: string) {
    const validation = validatePreorderSignup(preorderEmails[productId] ?? "");
    if (!validation.valid) {
      setPreorderErrors((prev) => ({ ...prev, [productId]: validation.error }));
      return;
    }
    setPreorderErrors((prev) => ({ ...prev, [productId]: "" }));
    setPreorderSubmitted((prev) => ({ ...prev, [productId]: true }));
  }

  const activeSelections = Object.entries(bundleSelections).filter(([, v]) => (v.qty ?? 0) > 0);
  const totalUnits = countTotalBundleUnits(bundleSelections);
  const volumeDiscount = getVolumeDiscount(totalUnits);
  const bundleSubtotal = calculateBundleSubtotal(bundleSelections);
  const bundleFinalPrice = calculateBundleFinalPrice(bundleSubtotal, volumeDiscount);

  return (
    <div style={{ paddingTop: 66, background: "var(--cw)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "var(--cr)", padding: "56px 40px 0", borderBottom: "1px solid rgba(44,26,14,.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase" as const, color: "var(--ca)", marginBottom: 12, fontWeight: 600 }}>Gift Bundles</div>
            <h1 className="serif" style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 300, color: "var(--cb)", marginBottom: 12 }}>
              Corporate Gifting,<br /><em style={{ color: "var(--ca)" }}>Sustainably Done</em>
            </h1>
            <p style={{ fontSize: 15, color: "var(--ct)", maxWidth: 540, fontWeight: 300, lineHeight: 1.7, marginBottom: 32 }}>
              Build your perfect eco-luxury bundle. Volume discounts from 20 units. Custom engraving, color choices, and full brand personalization.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" as const, marginBottom: 0 }}>
              {VOLUME_DISCOUNT_PILLS.map(({ label, value }) => (
                <div key={label} className="pill">
                  <span style={{ color: "var(--ca)", fontWeight: 600 }}>{value}</span>
                  <span style={{ opacity: .7 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, paddingTop: 16 }}>
            <button className={`tab-btn${tab === "bundle" ? " active" : ""}`} onClick={() => setTab("bundle")}>Build a Bundle</button>
            <button className={`tab-btn${tab === "preorder" ? " active" : ""}`} onClick={() => setTab("preorder")}>Pre-order</button>
          </div>
        </div>
      </div>

      {/* Bundle Tab */}
      {tab === "bundle" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 40px" }}>
          <div className="bundle-layout" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, alignItems: "start" }}>
            <div>
              <h2 className="serif" style={{ fontSize: 26, fontWeight: 300, color: "var(--cb)", marginBottom: 28 }}>Select Products</h2>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
                {BUNDLE_PRODUCTS.map((product) => {
                  const selection = bundleSelections[product.id] ?? {};
                  const isActive = (selection.qty ?? 0) > 0;
                  const colorEntry = COLORS[selection.color ?? 0];
                  const unitPrice = calculateUnitPrice(product.price, selection.color ?? 0, selection.engrave);

                  return (
                    <div key={product.id} className={`bcard${isActive ? " selected" : ""}`}>
                      <div style={{ display: "flex", gap: 0 }}>
                        <div style={{ width: 120, flexShrink: 0 }}>
                          <img src={product.photo} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </div>
                        <div style={{ flex: 1, padding: "20px 22px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                            <div>
                              <h3 className="serif" style={{ fontSize: 20, fontWeight: 400, color: "var(--cb)", marginBottom: 4 }}>{product.name}</h3>
                              <div style={{ fontSize: 13, color: "var(--ca)", fontWeight: 400 }}>From ${product.price}/unit</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 20 }}>
                              <button className="qty-btn" onClick={() => updateBundleSelection(product.id, "qty", Math.max(0, (selection.qty ?? 0) - 1))}>−</button>
                              <span style={{ fontSize: 16, fontWeight: 500, minWidth: 24, textAlign: "center" as const, color: "var(--cb)" }}>{selection.qty ?? 0}</span>
                              <button className="qty-btn" onClick={() => updateBundleSelection(product.id, "qty", (selection.qty ?? 0) + 1)}>+</button>
                            </div>
                          </div>

                          {isActive && (
                            <div style={{ borderTop: "1px solid rgba(44,26,14,.06)", paddingTop: 16, display: "flex", flexDirection: "column" as const, gap: 14 }}>
                              <div>
                                <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "var(--ct)", marginBottom: 8, fontWeight: 500 }}>
                                  Color — <span style={{ color: "var(--ca)", textTransform: "none" as const, letterSpacing: 0 }}>{colorEntry.name}{colorEntry.extra ? ` +$${colorEntry.extra}/unit` : ""}</span>
                                </div>
                                <div style={{ display: "flex", gap: 9 }}>
                                  {COLORS.map((c, ci) => (
                                    <button key={ci} className={`swatch${(selection.color ?? 0) === ci ? " sel" : ""}`}
                                      style={{ background: c.hex }} title={c.name}
                                      onClick={() => updateBundleSelection(product.id, "color", ci)} />
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "var(--ct)", marginBottom: 7, fontWeight: 500 }}>
                                  Engraving <span style={{ color: "rgba(44,26,14,.38)", textTransform: "none" as const, letterSpacing: 0 }}>+${calculateEngravingFee("x")}/unit if added</span>
                                </div>
                                <input className="ifield" style={{ fontSize: 12, padding: "9px 13px" }}
                                  placeholder="Initials, name, short message…"
                                  maxLength={28} value={selection.engrave ?? ""}
                                  onChange={(e) => updateBundleSelection(product.id, "engrave", e.target.value)} />
                              </div>
                              <div style={{ fontSize: 12, color: "var(--ct)", fontWeight: 300 }}>
                                Unit price: <strong style={{ color: "var(--ca)", fontWeight: 500 }}>${unitPrice}</strong>
                                {(selection.qty ?? 0) > 1 && <span style={{ marginLeft: 8 }}>× {selection.qty} = <strong style={{ color: "var(--cb)" }}>${calculateLineTotal(product.id, selection)}</strong></span>}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ position: "sticky", top: 88 }}>
              <div style={{ background: "var(--cr)", borderRadius: 6, padding: "32px 28px", border: "1px solid rgba(44,26,14,.08)" }}>
                <h3 className="serif" style={{ fontSize: 24, fontWeight: 300, color: "var(--cb)", marginBottom: 24 }}>Order Summary</h3>

                {activeSelections.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "var(--ct)", fontSize: 14, fontWeight: 300 }}>
                    Add products to start building your bundle.
                  </div>
                ) : (
                  <>
                    {activeSelections.map(([productId, selection]) => {
                      const product = BUNDLE_PRODUCTS.find((p) => p.id === productId)!;
                      const colorEntry = COLORS[selection.color ?? 0];
                      const lineTotal = calculateLineTotal(productId, selection);
                      const engravingFee = calculateEngravingFee(selection.engrave);
                      return (
                        <div key={productId} style={{ borderBottom: "1px solid rgba(44,26,14,.08)", paddingBottom: 14, marginBottom: 14 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--cb)" }}>{product.name}</span>
                            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--cb)" }}>${lineTotal}</span>
                          </div>
                          <div style={{ fontSize: 11, color: "var(--ct)", lineHeight: 1.6 }}>
                            {selection.qty}× · {colorEntry.name}{colorEntry.extra ? ` (+$${colorEntry.extra})` : ""}
                            {engravingFee > 0 ? ` · "${selection.engrave}" (+$${engravingFee})` : ""}
                          </div>
                        </div>
                      );
                    })}

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: "var(--ct)" }}>Subtotal ({totalUnits} units)</span>
                      <span style={{ fontSize: 13, color: "var(--ct)" }}>${bundleSubtotal}</span>
                    </div>

                    {volumeDiscount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, color: "var(--cs)", fontWeight: 500 }}>Volume discount ({Math.round(volumeDiscount * 100)}%)</span>
                        <span style={{ fontSize: 13, color: "var(--cs)", fontWeight: 500 }}>−${bundleSubtotal - bundleFinalPrice}</span>
                      </div>
                    )}

                    {totalUnits < 20 && (
                      <div style={{ fontSize: 11, color: "var(--ct)", background: "rgba(44,26,14,.04)", borderRadius: 4, padding: "8px 12px", marginBottom: 16 }}>
                        Add {20 - totalUnits} more units for 5% volume discount
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "2px solid rgba(44,26,14,.1)", marginBottom: 24, marginTop: 8 }}>
                      <span className="serif" style={{ fontSize: 20, fontWeight: 400, color: "var(--cb)" }}>Total</span>
                      <span className="serif" style={{ fontSize: 20, fontWeight: 400, color: "var(--ca)" }}>${bundleFinalPrice}</span>
                    </div>

                    {quoteSubmitted ? (
                      <div style={{ textAlign: "center", padding: "20px 0" }}>
                        <div style={{ fontSize: 36, marginBottom: 10 }}>🌿</div>
                        <div className="serif" style={{ fontSize: 20, fontWeight: 300, color: "var(--cb)", marginBottom: 6 }}>Request sent!</div>
                        <p style={{ fontSize: 13, color: "var(--ct)", fontWeight: 300 }}>We'll follow up within 24 hours with a formal quote.</p>
                      </div>
                    ) : (
                      <>
                        <input
                          className="ifield"
                          type="email"
                          placeholder="Your email address"
                          style={{ marginBottom: 6, fontSize: 13 }}
                          value={quoteEmail}
                          onChange={(e) => { setQuoteEmail(e.target.value); setQuoteEmailError(""); }}
                        />
                        {quoteEmailError && (
                          <p style={{ fontSize: 11, color: "#C0392B", marginBottom: 10, fontWeight: 400 }}>{quoteEmailError}</p>
                        )}
                        <button
                          className="btn-p"
                          style={{ width: "100%", justifyContent: "center", marginTop: 6, opacity: quoteSubmitting ? 0.6 : 1 }}
                          onClick={submitQuoteRequest}
                          disabled={quoteSubmitting}
                        >
                          <span>{quoteSubmitting ? "Sending…" : "Request Quote"}</span>
                          {!quoteSubmitting && <span>→</span>}
                        </button>
                        <p style={{ fontSize: 11, color: "var(--ct)", textAlign: "center", marginTop: 12, fontWeight: 300 }}>
                          No payment now — we'll send a formal quote within 24h
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pre-order Tab */}
      {tab === "preorder" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 40px" }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 className="serif" style={{ fontSize: 36, fontWeight: 300, color: "var(--cb)", marginBottom: 10 }}>Coming Soon</h2>
            <p style={{ fontSize: 15, color: "var(--ct)", fontWeight: 300, lineHeight: 1.7 }}>
              Two new products launching later this year. Register your interest and receive a 10% early-bird discount when they go live.
            </p>
          </div>

          <div className="preorder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {PREORDER_PRODUCTS.map((product, i) => (
              <div key={product.id} className="reveal pre-card" style={{ transitionDelay: `${i * 80}ms` }}>
                <div style={{ height: 180, borderRadius: 4, marginBottom: 24, background: product.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {product.IllustSVG && <product.IllustSVG />}
                </div>
                <div style={{ display: "inline-block", background: "var(--cb)", color: "var(--cr)", borderRadius: 2, padding: "3px 10px", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const, marginBottom: 14 }}>{product.tag}</div>
                <h3 className="serif" style={{ fontSize: 26, fontWeight: 400, color: "var(--cb)", marginBottom: 8 }}>{product.name}</h3>
                <p style={{ fontSize: 13, color: "var(--cbt)", lineHeight: 1.65, marginBottom: 6, fontWeight: 300 }}>{product.desc}</p>
                <div className="serif" style={{ fontSize: 18, color: "var(--ca)", marginBottom: 20 }}>Est. {product.estPrice}</div>

                {preorderSubmitted[product.id] ? (
                  <div style={{ textAlign: "center", padding: "16px 0" }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>✉️</div>
                    <div style={{ fontSize: 13, color: "var(--cs)", fontWeight: 500 }}>You're on the list!</div>
                    <div style={{ fontSize: 11, color: "var(--ct)", marginTop: 4, fontWeight: 300 }}>We'll notify you when {product.name} launches.</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
                    <div style={{ display: "flex", gap: 10 }}>
                      <input
                        className="ifield"
                        type="email"
                        placeholder="your@email.com"
                        style={{ fontSize: 12, flex: 1 }}
                        value={preorderEmails[product.id] ?? ""}
                        onChange={(e) => {
                          setPreorderEmails((prev) => ({ ...prev, [product.id]: e.target.value }));
                          setPreorderErrors((prev) => ({ ...prev, [product.id]: "" }));
                        }}
                      />
                      <button
                        className="btn-p"
                        style={{ padding: "12px 18px", whiteSpace: "nowrap" }}
                        onClick={() => submitPreorderSignup(product.id)}
                      >
                        <span>Notify Me</span>
                      </button>
                    </div>
                    {preorderErrors[product.id] && (
                      <p style={{ fontSize: 11, color: "#C0392B", fontWeight: 400 }}>{preorderErrors[product.id]}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 40, background: "var(--csg)", borderRadius: 6, padding: "24px 28px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ fontSize: 24 }}>🌿</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--cs)", marginBottom: 4 }}>Early Bird Offer</div>
              <p style={{ fontSize: 13, color: "var(--cbt)", fontWeight: 300, lineHeight: 1.6 }}>
                Everyone who pre-registers receives a <strong style={{ fontWeight: 500 }}>10% discount code</strong> via email the moment the product launches. No commitment required — just your email.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
