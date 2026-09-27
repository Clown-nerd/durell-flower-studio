import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Flower2, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import type { Product } from "@shared/commerce/types";
import { formatMoney } from "@/lib/catalog";
import { getProductCardImages, getQuickAddVariant } from "@/lib/productCardImages";
import { isPreviewProduct } from "@/lib/previewCatalog";
import { useCart } from "@/contexts/CartContext";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { primarySrc, primaryAlt, lifestyleSrc } = getProductCardImages(product);
  const quickAddVariant = isPreviewProduct(product) ? undefined : getQuickAddVariant(product);
  const { addItem, loading } = useCart();
  const [added, setAdded] = useState(false);
  useEffect(() => { if (!added) return; const timeout = window.setTimeout(() => setAdded(false), 1900); return () => window.clearTimeout(timeout); }, [added]);

  const handleQuickAdd = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); event.stopPropagation(); if (!quickAddVariant) return;
    try { await addItem(quickAddVariant.id); setAdded(true); }
    catch { toast.error("We couldn’t add that arrangement just now. Please try again."); }
  };

  return <article className={`group product-card ${lifestyleSrc ? "has-lifestyle" : ""}`}><Link href={`/products/${product.handle}`} className="block focus-visible:outline-none"><div className="product-image-wrap"><img src={primarySrc} alt={primaryAlt} className="product-image product-image-primary" loading={priority || isPreviewProduct(product) ? "eager" : "lazy"} />{lifestyleSrc ? <img src={lifestyleSrc} alt="" aria-hidden="true" className="product-image product-image-lifestyle" loading="eager" /> : null}<span className="product-card-link" aria-hidden="true"><ArrowUpRight className="size-4" /></span><button className="quick-add-button" onClick={event => void handleQuickAdd(event)} disabled={!quickAddVariant || loading} aria-label={quickAddVariant ? `Quick add ${product.title} to basket` : `${product.title} preview item`}>{added ? <motion.span className="quick-add-confirmation" initial={{ opacity: 0, scale: 0.72 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.86 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}><Flower2 className="size-4" /> Added to basket</motion.span> : <><ShoppingBag className="size-4" />{quickAddVariant ? (loading ? "Adding…" : "Quick add") : "Preview arrangement"}</>}</button>{added ? <AnimatePresence><motion.span aria-hidden="true" className="bloom-pulse" initial={{ opacity: 0, scale: 0.55 }} animate={{ opacity: [0, 0.8, 0], scale: [0.55, 1.2, 1.42] }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}><Flower2 className="size-5" /></motion.span></AnimatePresence> : null}</div><div className="mt-4 flex items-start justify-between gap-4"><div><p className="eyebrow text-[10px] text-wine">{product.productType || "Seasonal flowers"}</p><h3 className="mt-1 font-display text-xl tracking-[-0.03em] text-ink sm:text-2xl">{product.title}</h3></div><p className="pt-1 text-sm font-medium text-ink/80">{formatMoney(product.priceRange.min)}</p></div></Link></article>;
}

