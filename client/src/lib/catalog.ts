import type { Money, Product } from "@shared/commerce/types";

export type CatalogFilters = {
  size: string;
  color: string;
  category: string;
};

export const emptyCatalogFilters: CatalogFilters = {
  size: "all",
  color: "all",
  category: "all",
};

export function formatMoney(money: Money) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(money.amount));
}

export function tagValues(products: Product[], prefix: "Size" | "Color") {
  return Array.from(
    new Set(
      products.flatMap(product =>
        product.tags
          .filter(tag => tag.startsWith(`${prefix}:`))
          .map(tag => tag.slice(prefix.length + 1).trim())
      )
    )
  ).sort();
}

export function filterProducts(products: Product[], filters: CatalogFilters) {
  return products.filter(product => {
    const hasTag = (prefix: "Size" | "Color", value: string) =>
      value === "all" || product.tags.includes(`${prefix}: ${value}`);

    const inCategory =
      filters.category === "all" || product.productType === filters.category;

    return inCategory && hasTag("Size", filters.size) && hasTag("Color", filters.color);
  });
}
