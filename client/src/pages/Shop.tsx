import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { emptyCatalogFilters, filterProducts, tagValues, type CatalogFilters } from "@/lib/catalog";
import { previewProducts } from "@/lib/previewCatalog";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Reveal } from "@/components/storefront/Reveal";
import { StorefrontShell } from "@/components/storefront/StorefrontShell";

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="filter-select"><span className="sr-only">Filter by {label}</span><select value={value} onChange={event => onChange(event.target.value)}><option value="all">All {label.toLowerCase()}</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></label>;
}

export default function Shop() {
  const productInput = useMemo(() => ({ first: 32 }), []);
  const { data: products = [], isLoading } = trpc.commerce.products.list.useQuery(productInput);
  const catalog = products.length ? products : previewProducts;
  const [filters, setFilters] = useState<CatalogFilters>(emptyCatalogFilters);
  const stems = useMemo(() => tagValues(catalog, "Size"), [catalog]);
  const seasons = useMemo(() => tagValues(catalog, "Color"), [catalog]);
  const occasions = useMemo(() => Array.from(new Set(catalog.map(product => product.productType).filter((value): value is string => Boolean(value)))).sort(), [catalog]);
  const visibleProducts = useMemo(() => filterProducts(catalog, filters), [catalog, filters]);
  const hasFilters = Object.values(filters).some(value => value !== "all");
  const updateFilter = (key: keyof CatalogFilters, value: string) => setFilters(current => ({ ...current, [key]: value }));

  return <StorefrontShell><section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8"><div className="absolute -right-24 top-12 size-80 rounded-full bg-botanical/10 blur-3xl" aria-hidden="true" /><div className="container relative"><Reveal><p className="eyebrow text-[10px] text-wine">The collected works</p><div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><h1 className="font-display max-w-2xl text-6xl leading-[0.92] tracking-[-0.05em] sm:text-8xl">Flowers for<br /><em className="text-wine">the living room.</em></h1><p className="mt-5 max-w-md text-sm leading-6 text-ink/65">Hand-tied seasonal arrangements, made to order and sent with a little space to open.</p></div><p className="text-sm text-ink/55">{visibleProducts.length} {visibleProducts.length === 1 ? "arrangement" : "arrangements"}</p></div></Reveal><div className="mt-11 flex flex-wrap items-center gap-3 border-y border-ink/10 py-4"><span className="inline-flex items-center gap-2 pr-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/55"><SlidersHorizontal className="size-4" /> Refine</span><FilterSelect label="By occasion" value={filters.category} options={occasions} onChange={value => updateFilter("category", value)} /><FilterSelect label="By stem" value={filters.size} options={stems} onChange={value => updateFilter("size", value)} /><FilterSelect label="By season" value={filters.color} options={seasons} onChange={value => updateFilter("color", value)} />{hasFilters ? <button className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-wine hover:text-ink" onClick={() => setFilters(emptyCatalogFilters)}><X className="size-3.5" /> Clear</button> : null}</div>{isLoading && !products.length ? <div className="catalog-grid mt-9">{[0, 1, 2].map(index => <div key={index} className="h-[28rem] animate-pulse bg-ink/7" />)}</div> : visibleProducts.length ? <div className="catalog-grid mt-9">{visibleProducts.map((product, index) => <Reveal key={product.id} delay={(index % 3) * 90}><ProductCard product={product} priority={index < 2} /></Reveal>)}</div> : <div className="mt-10 border border-dashed border-ink/15 bg-white/30 px-6 py-14 text-center"><p className="font-display text-3xl tracking-[-0.04em]">Nothing quite matches that combination.</p><p className="mt-3 text-sm text-ink/60">Open one of the filters to see the full edit again.</p><button className="button-secondary mt-6" onClick={() => setFilters(emptyCatalogFilters)}>Show all arrangements</button></div>}</div></section></StorefrontShell>;
}

