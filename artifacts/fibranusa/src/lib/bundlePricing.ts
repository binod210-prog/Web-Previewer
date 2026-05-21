import { COLORS, BUNDLE_PRODUCTS } from "../data";

export const ENGRAVING_FEE_PER_UNIT = 4;

export const VOLUME_TIERS: Array<{ min: number; max: number; discount: number }> = [
  { min: 0,   max: 19,       discount: 0    },
  { min: 20,  max: 49,       discount: 0.05 },
  { min: 50,  max: 99,       discount: 0.10 },
  { min: 100, max: Infinity, discount: 0.15 },
];

export type BundleSelection = {
  qty?: number;
  color?: number;
  engrave?: string;
};

export function calculateEngravingFee(engraveText: string | undefined): number {
  return engraveText?.trim() ? ENGRAVING_FEE_PER_UNIT : 0;
}

export function calculateUnitPrice(
  basePrice: number,
  colorIndex: number,
  engraveText: string | undefined,
): number {
  const colorExtra = COLORS[colorIndex]?.extra ?? 0;
  const engravingFee = calculateEngravingFee(engraveText);
  return basePrice + colorExtra + engravingFee;
}

export function calculateLineTotal(
  productId: string,
  selection: BundleSelection,
): number {
  const product = BUNDLE_PRODUCTS.find((p) => p.id === productId);
  if (!product) return 0;
  const qty = selection.qty ?? 0;
  if (qty <= 0) return 0;
  return calculateUnitPrice(product.price, selection.color ?? 0, selection.engrave) * qty;
}

export function calculateBundleSubtotal(
  selections: Record<string, BundleSelection>,
): number {
  return Object.entries(selections)
    .filter(([, v]) => (v.qty ?? 0) > 0)
    .reduce((total, [id, v]) => total + calculateLineTotal(id, v), 0);
}

export function countTotalBundleUnits(
  selections: Record<string, BundleSelection>,
): number {
  return Object.values(selections).reduce((sum, v) => sum + (v.qty ?? 0), 0);
}

export function getVolumeDiscount(totalUnits: number): number {
  return (
    VOLUME_TIERS.find((tier) => totalUnits >= tier.min && totalUnits <= tier.max)
      ?.discount ?? 0
  );
}

export function calculateBundleFinalPrice(
  subtotal: number,
  discountRate: number,
): number {
  return Math.round(subtotal * (1 - discountRate));
}
