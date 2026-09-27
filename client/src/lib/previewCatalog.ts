import type { Product } from "@shared/commerce/types";

const image = (url: string, altText: string) => ({ url, altText, width: 1664, height: 2080 });
const money = (amount: string) => ({ amount, currencyCode: "USD" });

export const previewProducts: Product[] = [
  {
    id: "preview-evening-arrangement",
    handle: "the-evening-arrangement",
    title: "The Evening Arrangement",
    description: "A low, generous gathering of garden roses, dark sweet peas, and airy seasonal stems. Made for the table after dusk.",
    descriptionHtml: "<p>A low, generous gathering of garden roses, dark sweet peas, and airy seasonal stems. Made for the table after dusk.</p>",
    productType: "Seasonal arrangement",
    vendor: "Durell.",
    tags: ["Featured", "Size: Large", "Color: Wine"],
    images: [image("/manus-storage/durell-collection-03_c5b71359.jpg", "The Evening Arrangement with burgundy dahlias and dark foliage")],
    priceRange: { min: money("148"), max: money("198") },
    options: [{ name: "Size", values: ["Large", "Extra large"] }],
    variants: [
      { id: "preview-evening-large", title: "Large", price: money("148"), compareAtPrice: null, availableForSale: true, selectedOptions: [{ name: "Size", value: "Large" }] },
      { id: "preview-evening-extra", title: "Extra large", price: money("198"), compareAtPrice: null, availableForSale: true, selectedOptions: [{ name: "Size", value: "Extra large" }] },
    ],
  },
  {
    id: "preview-quiet-orchard",
    handle: "quiet-orchard",
    title: "Quiet Orchard",
    description: "White cosmos, pale peach ranunculus, and olive branches in a clear glass vase. Light, open, and easy to live with.",
    descriptionHtml: "<p>White cosmos, pale peach ranunculus, and olive branches in a clear glass vase. Light, open, and easy to live with.</p>",
    productType: "Seasonal arrangement",
    vendor: "Durell.",
    tags: ["Featured", "Size: Medium", "Color: Oat"],
    images: [image("/manus-storage/durell-collection-02_69d67a50.jpg", "Quiet Orchard arrangement with cosmos and peach ranunculus")],
    priceRange: { min: money("96"), max: money("136") },
    options: [{ name: "Size", values: ["Medium", "Large"] }],
    variants: [
      { id: "preview-orchard-medium", title: "Medium", price: money("96"), compareAtPrice: null, availableForSale: true, selectedOptions: [{ name: "Size", value: "Medium" }] },
      { id: "preview-orchard-large", title: "Large", price: money("136"), compareAtPrice: null, availableForSale: true, selectedOptions: [{ name: "Size", value: "Large" }] },
    ],
  },
  {
    id: "preview-wine-garden",
    handle: "wine-garden",
    title: "Wine Garden",
    description: "A sculptural hand-tied bouquet in deep rose, dusty mauve, and cream. The one that stays with the room.",
    descriptionHtml: "<p>A sculptural hand-tied bouquet in deep rose, dusty mauve, and cream. The one that stays with the room.</p>",
    productType: "Hand-tied bouquet",
    vendor: "Durell.",
    tags: ["Size: Medium", "Color: Wine"],
    images: [image("/manus-storage/durell-collection-01_e7b7faf6.jpg", "Wine Garden hand-tied bouquet in deep rose and cream")],
    priceRange: { min: money("118"), max: money("168") },
    options: [{ name: "Size", values: ["Medium", "Large"] }],
    variants: [
      { id: "preview-wine-medium", title: "Medium", price: money("118"), compareAtPrice: null, availableForSale: true, selectedOptions: [{ name: "Size", value: "Medium" }] },
      { id: "preview-wine-large", title: "Large", price: money("168"), compareAtPrice: null, availableForSale: true, selectedOptions: [{ name: "Size", value: "Large" }] },
    ],
  },
  {
    id: "preview-sunday-stem",
    handle: "the-sunday-stem",
    title: "The Sunday Stem",
    description: "A smaller weekly gesture. Seasonal stems chosen to bring the outside in without asking for much space.",
    descriptionHtml: "<p>A smaller weekly gesture. Seasonal stems chosen to bring the outside in without asking for much space.</p>",
    productType: "Weekly stems",
    vendor: "Durell.",
    tags: ["Size: Small", "Color: Botanical"],
    images: [image("/manus-storage/durell-collection-02_69d67a50.jpg", "The Sunday Stem weekly flower arrangement")],
    priceRange: { min: money("72"), max: money("92") },
    options: [{ name: "Size", values: ["Small", "Medium"] }],
    variants: [
      { id: "preview-sunday-small", title: "Small", price: money("72"), compareAtPrice: null, availableForSale: true, selectedOptions: [{ name: "Size", value: "Small" }] },
      { id: "preview-sunday-medium", title: "Medium", price: money("92"), compareAtPrice: null, availableForSale: true, selectedOptions: [{ name: "Size", value: "Medium" }] },
    ],
  },
];

export function getPreviewProduct(handle: string | undefined) {
  return previewProducts.find(product => product.handle === handle);
}

export function isPreviewProduct(product: Product) {
  return product.id.startsWith("preview-");
}
