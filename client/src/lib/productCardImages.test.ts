import { describe, expect, it } from "vitest";
import { getProductCardImages, getQuickAddVariant, productCardFallbackImage } from "./productCardImages";
import type { Product } from "@shared/commerce/types";

const baseProduct: Product = {
  id: "one",
  handle: "the-evening-arrangement",
  title: "The Evening Arrangement",
  description: "",
  descriptionHtml: "",
  productType: "Seasonal arrangement",
  vendor: "Durell.",
  tags: [],
  images: [{ url: "https://example.com/catalog.jpg", altText: "Seasonal wine flower arrangement" }],
  priceRange: {
    min: { amount: "124", currencyCode: "KES" },
    max: { amount: "124", currencyCode: "KES" },
  },
  options: [],
  variants: [],
};

describe("getProductCardImages", () => {
  it("uses a curated lifestyle fallback when the catalog supplies one product image", () => {
    expect(getProductCardImages(baseProduct)).toEqual({
      primarySrc: "https://example.com/catalog.jpg",
      primaryAlt: "Seasonal wine flower arrangement",
      lifestyleSrc: "/manus-storage/durell-hero_93f8987b.jpg",
    });
  });

  it("prefers a second Shopify image and protects the primary-image fallback", () => {
    const product = {
      ...baseProduct,
      handle: "another-piece",
      images: [
        { url: "https://example.com/catalog.jpg", altText: null },
        { url: "https://example.com/lifestyle.jpg", altText: null },
      ],
    };

    expect(getProductCardImages(product)).toEqual({
      primarySrc: "https://example.com/catalog.jpg",
      primaryAlt: "The Evening Arrangement seasonal flower arrangement by Durell.",
      lifestyleSrc: "https://example.com/lifestyle.jpg",
    });
    expect(getProductCardImages({ ...baseProduct, images: [] }).primarySrc).toBe(productCardFallbackImage);
  });

  it("selects the first purchasable variant for Quick Add", () => {
    const product = {
      ...baseProduct,
      variants: [
        { id: "sold-out", title: "S / Oat", availableForSale: false, price: { amount: "124", currencyCode: "KES" }, compareAtPrice: null, selectedOptions: [] },
        { id: "available", title: "M / Oat", availableForSale: true, price: { amount: "124", currencyCode: "KES" }, compareAtPrice: null, selectedOptions: [] },
      ],
    };

    expect(getQuickAddVariant(product)?.id).toBe("available");
    expect(getQuickAddVariant({ ...product, variants: [] })).toBeUndefined();
  });
});
