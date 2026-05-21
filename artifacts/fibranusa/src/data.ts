import imgSetA from "./assets/set-a.jpeg";
import imgSetB from "./assets/set-b.jpeg";
import imgSetC from "./assets/set-c.jpeg";
import imgSetTenun from "./assets/set-tenun.jpeg";

export const COLORS = [
  { name: "Natural",     hex: "#C4895A", extra: 0 },
  { name: "Dark Brown",  hex: "#2C1A0E", extra: 0 },
  { name: "Sage Green",  hex: "#5C7A5A", extra: 0 },
  { name: "Terracotta",  hex: "#C4895A", extra: 3 },
];

export const PRODUCTS = [
  {
    id: "sla",
    label: "Best Value",
    tag: "Best Value",
    name: "Premium Leather Set A",
    basePrice: 15,
    shortDesc: "Affordable premium gifting solution",
    desc: "Card Holder, Keychain, Hard Box. Minimal yet premium sustainable gift set.",
    bg: "#E8D9C8",
    items: ["Card Holder", "Keychain", "Hard Box"],
    photo: imgSetA,
  },
  {
    id: "slb",
    label: "Most Popular",
    tag: "Most Popular",
    name: "Premium Leather Set B",
    basePrice: 25,
    shortDesc: "Best for onboarding & corporate gifting",
    desc: "Notebook, Keychain, Card Holder, Hard Box. A complete eco-friendly corporate gift set.",
    bg: "#DDD0BE",
    items: ["Notebook", "Keychain", "Card Holder", "Hard Box"],
    photo: imgSetB,
  },
  {
    id: "slc",
    label: "Premium",
    tag: "Premium",
    name: "Premium Leather Set C",
    basePrice: 35,
    shortDesc: "Perfect for executive gifts & premium clients",
    desc: "Cardcase, Keychain, Cardholder, Premium Hard Box. A complete professional gifting set.",
    bg: "#D4C4AE",
    items: ["Cardcase", "Keychain", "Cardholder", "Premium Hard Box"],
    photo: imgSetC,
  },
  {
    id: "stl",
    label: "VIP",
    tag: "VIP",
    name: "Premium Tenun & Leather Set",
    basePrice: 65,
    shortDesc: "Luxury executive & VIP corporate gifting",
    desc: "Zipcase, Brimay, ID Card Holder, Keychain, Card Holder, Hard Box. Luxury executive set.",
    bg: "#C8B89E",
    items: ["Zipcase", "Brimay", "ID Card Holder", "Keychain", "Card Holder", "Hard Box"],
    photo: imgSetTenun,
  },
];

export const BUNDLE_PRODUCTS = [
  { id: "sla", name: "Premium Leather Set A", price: 15, photo: imgSetA },
  { id: "slb", name: "Premium Leather Set B", price: 25, photo: imgSetB },
  { id: "slc", name: "Premium Leather Set C", price: 35, photo: imgSetC },
  { id: "stl", name: "Premium Tenun & Leather Set", price: 65, photo: imgSetTenun },
];

export const SUSTAIN = [
  {
    icon: "🌱",
    label: "Circular Economy",
    desc: "Agricultural waste transformed into luxury goods — nothing goes to landfill in our production process.",
  },
  {
    icon: "🤝",
    label: "Fair Trade Principles",
    desc: "Every farmer and artisan in our supply chain is paid fairly. We believe sustainability starts with people.",
  },
  {
    icon: "📋",
    label: "Transparent Supply Chain",
    desc: "From banana to finished product, we document and publish every step of our production journey.",
  },
  {
    icon: "🎨",
    label: "Heritage Craft",
    desc: "We collaborate with local Javanese artisans to preserve traditional weaving and leatherwork techniques.",
  },
  {
    icon: "📦",
    label: "Minimise Plastic Packaging",
    desc: "We are committed to minimising plastic in all packaging, using recycled paper, seed paper, and natural linen wherever possible.",
  },
  {
    icon: "🔋",
    label: "Renewable Energy",
    desc: "Our production facility runs on solar energy, reducing our operational footprint significantly.",
  },
];
