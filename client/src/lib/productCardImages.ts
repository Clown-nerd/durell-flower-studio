import type { Product, ProductVariant } from "@shared/commerce/types";

export const productCardFallbackImage = "/manus-storage/durell-collection-01_e7b7faf6.jpg";
const lifestyleFallbacks: Record<string, string> = { "the-evening-arrangement": "/manus-storage/durell-hero_93f8987b.jpg", "quiet-orchard": "/manus-storage/durell-hero_93f8987b.jpg" };

export function getProductCardImages(product: Product) {
  return { primarySrc: product.images[0]?.url || productCardFallbackImage, primaryAlt: product.images[0]?.altText || `${product.title} seasonal flower arrangement by Durell.`, lifestyleSrc: product.images[1]?.url || lifestyleFallbacks[product.handle] };
}
export function getQuickAddVariant(product: Product): ProductVariant | undefined { return product.variants.find(variant => variant.availableForSale); }

