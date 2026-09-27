import { describe, expect, it } from "vitest";
import { emptyCatalogFilters, filterProducts, formatMoney, tagValues } from "./catalog";
import type { Product } from "@shared/commerce/types";

const sampleProducts: Product[] = [
  {
    id: "one",
    handle: "quiet-orchard",
    title: "Quiet Orchard",
    description: "",
    descriptionHtml: "",
    productType: "Seasonal arrangement",
    vendor: "Durell.",
    tags: ["Size: Small", "Size: Medium", "Color: Oat"],
    images: [],
    priceRange: {
      min: { amount: "124.00", currencyCode: "USD" },
      max: { amount: "124.00", currencyCode: "USD" },
    },
    options: [],
    variants: [],
  },
  {
    id: "two",
    handle: "wine-garden",
    title: "Wine Garden",
    description: "",
    descriptionHtml: "",
    productType: "Hand-tied bouquet",
    vendor: "Durell.",
    tags: ["Size: Large", "Color: Botanical"],
    images: [],
    priceRange: {
      min: { amount: "96.00", currencyCode: "USD" },
      max: { amount: "96.00", currencyCode: "USD" },
    },
    options: [],
    variants: [],
  },
];

describe("catalog helpers", () => {
  it("lists unique tag values for filter controls", () => {
    expect(tagValues(sampleProducts, "Size")).toEqual(["Large", "Medium", "Small"]);
    expect(tagValues(sampleProducts, "Color")).toEqual(["Botanical", "Oat"]);
  });

  it("filters products across category, color, and size", () => {
    expect(
      filterProducts(sampleProducts, { ...emptyCatalogFilters, category: "Seasonal arrangement", size: "Medium" })
    ).toHaveLength(1);
    expect(
      filterProducts(sampleProducts, { ...emptyCatalogFilters, color: "Botanical" })
    ).toEqual([sampleProducts[1]]);
  });

  it("formats storefront prices as currency", () => {
    expect(formatMoney({ amount: "124.00", currencyCode: "USD" })).toBe("$124");
  });
});
