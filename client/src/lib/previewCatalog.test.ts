import { describe, expect, it } from "vitest";
import { getPreviewProduct, previewProducts } from "./previewCatalog";

describe("Durell preview catalog", () => {
  it("contains flower arrangements with usable commerce fields", () => {
    expect(previewProducts.length).toBeGreaterThanOrEqual(3);
    for (const product of previewProducts) {
      expect(product.vendor).toBe("Durell.");
      expect(product.images[0]?.altText).toMatch(/arrangement|bouquet|stems|flowers/i);
      expect(Number(product.priceRange.min.amount)).toBeGreaterThan(0);
      expect(product.variants.some(variant => variant.availableForSale)).toBe(true);
    }
  });

  it("resolves preview routes by handle", () => {
    expect(getPreviewProduct("the-evening-arrangement")?.title).toBe("The Evening Arrangement");
    expect(getPreviewProduct("missing-arrangement")).toBeUndefined();
  });

  it("gives every preview arrangement a flower image for catalogue and hero surfaces", () => {
    expect(previewProducts.every(product => product.images.length > 0 && product.images[0]?.url.includes("manus-storage"))).toBe(true);
  });
});
