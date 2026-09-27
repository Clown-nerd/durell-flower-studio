import type { ReactNode } from "react";
import { ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { deliveryTimeSlots, formatDeliveryDate, isDeliveryDateUnavailable, isValidDeliverySelection, type DeliverySlot, type FulfilmentMode } from "@/lib/delivery";
import { Calendar } from "@/components/ui/calendar";
import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { formatMoney } from "@/lib/catalog";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const fallbackImage = "/manus-storage/durell-collection-01_e7b7faf6.jpg";
const DELIVERY_STORAGE_KEY = "durell:delivery-preference";
type DeliveryPreference = { date: string; slot: DeliverySlot; mode?: FulfilmentMode };

function CartDrawer() {
  const { cart, isOpen, loading, itemCount, openCart, closeCart, updateQuantity, removeItem, proceedToCheckout } = useCart();
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliverySlot, setDeliverySlot] = useState<DeliverySlot>("09:00-12:00");
  const [fulfilmentMode, setFulfilmentMode] = useState<FulfilmentMode>("delivery");
  const [deliverySaved, setDeliverySaved] = useState(false);
  const minDeliveryDate = useMemo(() => { const date = new Date(); date.setHours(12, 0, 0, 0); date.setDate(date.getDate() + 1); return date; }, []);
  const selectedDeliveryDate = deliveryDate ? new Date(`${deliveryDate}T12:00:00`) : undefined;

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { const saved = JSON.parse(window.localStorage.getItem(DELIVERY_STORAGE_KEY) || "null") as DeliveryPreference | null; if (saved && isValidDeliverySelection(saved.date, saved.slot, saved.mode || "delivery")) { setDeliveryDate(saved.date); setDeliverySlot(saved.slot); setFulfilmentMode(saved.mode || "delivery"); } } catch { /* ignore malformed local preference */ }
  }, []);

  const setCalendarDate = (date: Date | undefined) => { if (!date) return; const value = date.toISOString().slice(0, 10); setDeliveryDate(value); setDeliverySaved(false); };
  const setMode = (mode: FulfilmentMode) => { setFulfilmentMode(mode); setDeliverySaved(false); if (mode === "delivery" && deliveryDate && isDeliveryDateUnavailable(new Date(`${deliveryDate}T12:00:00`))) setDeliveryDate(""); };

  const saveDeliveryPreference = () => {
    if (!isValidDeliverySelection(deliveryDate, deliverySlot, fulfilmentMode)) return;
    window.localStorage.setItem(DELIVERY_STORAGE_KEY, JSON.stringify({ date: deliveryDate, slot: deliverySlot, mode: fulfilmentMode }));
    setDeliverySaved(true);
    window.setTimeout(() => setDeliverySaved(false), 1800);
  };

  return (
    <Sheet open={isOpen} onOpenChange={open => (open ? openCart() : closeCart())}>
      <SheetContent side="right" className="cart-drawer w-full border-l-0 bg-cream px-2 sm:max-w-md">
        <SheetHeader className="border-b border-ink/10 px-5 pb-5 pt-6">
          <SheetTitle className="font-display text-3xl tracking-[-0.04em] text-ink">Your flowers <span className="text-wine">({itemCount})</span></SheetTitle>
          <SheetDescription className="font-body text-xs tracking-[0.03em] text-ink/60">Your selections, held for the next moment.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 py-5">
          {!cart?.items.length ? (
            <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
              <div className="botanical-mark mb-4 text-botanical" aria-hidden="true"><span className="botanical-stem" /></div>
              <p className="font-display text-2xl tracking-[-0.04em] text-ink">Your basket is quiet.</p>
              <p className="mt-2 max-w-56 text-sm leading-6 text-ink/60">Find an arrangement that feels like the right note.</p>
              <button onClick={closeCart} className="text-link mt-5">Continue browsing</button>
            </div>
          ) : (
            <ul className="space-y-5" aria-label="Items in your basket">
              {cart.items.map(item => (
                <li key={item.lineId} className="flex gap-4">
                  <img src={item.image?.url || fallbackImage} alt={item.image?.altText || item.productTitle} className="size-24 rounded-sm object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="font-display text-lg tracking-[-0.03em] text-ink">{item.productTitle}</p>{item.variantTitle !== "Default Title" && <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-ink/50">{item.variantTitle}</p>}</div>
                      <button aria-label={`Remove ${item.productTitle}`} className="rounded-full p-1 text-ink/45 transition hover:bg-wine/10 hover:text-wine" onClick={() => void removeItem(item.lineId)} disabled={loading}><Trash2 className="size-4" /></button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-ink/12 bg-white/45 p-1">
                        <button aria-label={`Decrease quantity of ${item.productTitle}`} className="grid size-7 place-items-center rounded-full transition hover:bg-ink hover:text-cream disabled:opacity-40" onClick={() => void updateQuantity(item.lineId, item.quantity - 1)} disabled={loading}><Minus className="size-3" /></button>
                        <span className="w-7 text-center text-xs font-semibold">{item.quantity}</span>
                        <button aria-label={`Increase quantity of ${item.productTitle}`} className="grid size-7 place-items-center rounded-full transition hover:bg-ink hover:text-cream disabled:opacity-40" onClick={() => void updateQuantity(item.lineId, item.quantity + 1)} disabled={loading}><Plus className="size-3" /></button>
                      </div>
                      <p className="text-sm font-semibold text-ink">{formatMoney(item.lineTotal)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart?.items.length ? <SheetFooter className="border-t border-ink/10 bg-white/25 px-5 py-5"><div className="space-y-5"><div><p className="field-label">Schedule delivery</p><p className="mt-1 text-xs leading-5 text-ink/55">Choose a day and a quiet window. We will confirm the final route at checkout.</p><div className="mt-3 grid grid-cols-2 gap-2" role="group" aria-label="Fulfilment method"><button type="button" className={`fulfilment-chip ${fulfilmentMode === "delivery" ? "fulfilment-chip-selected" : ""}`} onClick={() => setMode("delivery")}>Delivery</button><button type="button" className={`fulfilment-chip ${fulfilmentMode === "pickup" ? "fulfilment-chip-selected" : ""}`} onClick={() => setMode("pickup")}>Studio pickup</button></div><div className="mt-3 rounded-sm border border-ink/10 bg-cream/70 p-2"><Calendar mode="single" selected={selectedDeliveryDate} onSelect={setCalendarDate} disabled={fulfilmentMode === "delivery" ? [{ before: minDeliveryDate }, isDeliveryDateUnavailable] : { before: minDeliveryDate }} modifiers={{ unavailable: (date) => isDeliveryDateUnavailable(date) }} modifiersClassNames={{ unavailable: "delivery-unavailable" }} initialFocus className="delivery-calendar w-full" /></div><p className="mt-2 text-[10px] leading-4 text-ink/50"><span className="calendar-legend-dot" /> Gray dates are fully booked for delivery. {fulfilmentMode === "pickup" ? "Pickup remains available." : "Choose studio pickup for those dates."}</p>{fulfilmentMode === "delivery" ? <label className="mt-3 block"><span className="field-label">Time window</span><select className="quiet-input mt-2" value={deliverySlot} onChange={event => { setDeliverySlot(event.target.value as DeliverySlot); setDeliverySaved(false); }} aria-label="Delivery time window">{deliveryTimeSlots.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label> : <p className="delivery-summary mt-3 rounded-sm px-3 py-2 text-xs text-ink/70">Studio pickup · Durell. workshop · 10am–5pm</p>}<button type="button" className="text-link mt-3" onClick={saveDeliveryPreference} disabled={!isValidDeliverySelection(deliveryDate, deliverySlot, fulfilmentMode)}>{deliverySaved ? "Preference saved" : `Save ${fulfilmentMode} preference`}</button>{deliveryDate && isValidDeliverySelection(deliveryDate, deliverySlot, fulfilmentMode) ? <p className="delivery-summary mt-3 rounded-sm px-3 py-2 text-xs text-ink/70">{fulfilmentMode === "pickup" ? "Pickup" : "Delivery"} on <strong>{formatDeliveryDate(deliveryDate)}</strong>{fulfilmentMode === "delivery" ? <> · {deliveryTimeSlots.find(option => option.value === deliverySlot)?.label}</> : null}</p> : null}</div><div className="flex items-center justify-between text-sm"><span className="text-ink/60">Subtotal</span><span className="font-semibold text-ink">{formatMoney(cart.subtotal)}</span></div><p className="text-xs leading-5 text-ink/55">Delivery and taxes are calculated at checkout.</p><button className="button-primary mt-1 w-full" onClick={proceedToCheckout} disabled={loading}>Checkout securely <ChevronRight className="size-4" /></button></div></SheetFooter> : null}
      </SheetContent>
    </Sheet>
  );
}

export function StorefrontShell({ children }: { children: ReactNode }) {
  const { itemCount, openCart } = useCart();
  return (
    <div className="min-h-screen overflow-x-clip bg-cream text-ink">
      <header className="sticky top-0 z-40 border-b border-ink/8 bg-cream/85 backdrop-blur-xl">
        <div className="container flex h-18 items-center justify-between gap-4 sm:h-20">
          <nav className="hidden items-center gap-7 text-xs font-medium uppercase tracking-[0.16em] text-ink/70 md:flex" aria-label="Primary"><a href="/#occasions" className="nav-link">Occasions</a><Link href="/shop" className="nav-link">Shop flowers</Link><a href="/#studio" className="nav-link">The studio</a></nav>
          <Link href="/" className="font-display absolute left-1/2 -translate-x-1/2 text-2xl tracking-[-0.05em] text-ink sm:text-3xl">Durell<span className="text-wine">.</span></Link>
          <div className="flex items-center gap-3 md:hidden"><a href="/#occasions" className="nav-link text-xs font-medium uppercase tracking-[0.13em] text-ink/70">Occasions</a><Link href="/shop" className="nav-link text-xs font-medium uppercase tracking-[0.13em] text-ink/70">Shop</Link></div>
          <button className="ml-auto inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition hover:border-wine hover:bg-white" onClick={openCart} aria-label={`Open basket with ${itemCount} item${itemCount === 1 ? "" : "s"}`}><ShoppingBag className="size-4" /><span className="hidden sm:inline">Basket</span><span className="grid size-5 place-items-center rounded-full bg-ink text-[10px] text-cream">{itemCount}</span></button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-ink/10 bg-ink px-4 py-14 text-cream sm:px-6 lg:px-8">
        <div className="container grid gap-12 md:grid-cols-[1.35fr_0.8fr_0.9fr]">
          <div><p className="font-display text-4xl tracking-[-0.05em]">Durell<span className="text-sand">.</span></p><p className="mt-4 max-w-sm text-sm leading-6 text-cream/65">An independent flower studio making hand-tied seasonal arrangements, wedding flowers, and standing subscriptions to order.</p></div>
          <div><p className="eyebrow text-[10px] text-sand">Visit the edit</p><ul className="mt-4 space-y-2.5 text-sm text-cream/70"><li><Link className="footer-link" href="/shop">Shop flowers</Link></li><li><a className="footer-link" href="/#occasions">Weddings &amp; events</a></li><li><a className="footer-link" href="/#subscriptions">Subscriptions</a></li></ul></div>
          <div><p className="eyebrow text-[10px] text-sand">Customer care</p><ul className="mt-4 space-y-2.5 text-sm text-cream/70"><li><a className="footer-link" href="mailto:hello@durell.example">hello@durell.example</a></li><li><a className="footer-link" href="#shipping">Delivery &amp; returns</a></li><li><a className="footer-link" href="#accessibility">Accessibility</a></li></ul></div>
        </div>
        <div className="container mt-12 flex flex-col justify-between gap-3 border-t border-cream/15 pt-5 text-[10px] uppercase tracking-[0.15em] text-cream/45 sm:flex-row"><p>© {new Date().getFullYear()} Durell.</p><p>Flowers, in their own time.</p></div>
      </footer>
      <CartDrawer />
    </div>
  );
}
