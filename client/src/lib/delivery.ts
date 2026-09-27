export const deliveryTimeSlots = [
  { value: "09:00-12:00", label: "Morning · 9am–12pm" },
  { value: "12:00-15:00", label: "Midday · 12–3pm" },
  { value: "15:00-18:00", label: "Afternoon · 3–6pm" },
] as const;

export type DeliverySlot = (typeof deliveryTimeSlots)[number]["value"];
export type FulfilmentMode = "delivery" | "pickup";

/** Deterministic preview availability: Sundays and two seasonal sell-out dates are fully booked. */
export function isDeliveryDateUnavailable(date: Date) {
  return date.getDay() === 0 || date.getDate() === 9 || date.getDate() === 23;
}

export function formatDeliveryDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(date);
}

export function isValidDeliveryDate(value: string) {
  if (!value) return false;
  const selected = new Date(`${value}T12:00:00`);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return !Number.isNaN(selected.getTime()) && selected >= today;
}

export function isValidDeliverySelection(date: string, slot: string, mode: FulfilmentMode = "delivery") {
  if (!isValidDeliveryDate(date)) return false;
  if (mode === "pickup") return true;
  const parsed = new Date(`${date}T12:00:00`);
  return !isDeliveryDateUnavailable(parsed) && deliveryTimeSlots.some(option => option.value === slot);
}
