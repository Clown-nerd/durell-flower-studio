import { describe, expect, it } from "vitest";
import { deliveryTimeSlots, formatDeliveryDate, isDeliveryDateUnavailable, isValidDeliveryDate, isValidDeliverySelection } from "./delivery";

describe("delivery preferences", () => {
  it("offers quiet, bounded delivery windows", () => {
    expect(deliveryTimeSlots).toHaveLength(3);
    expect(deliveryTimeSlots.map(slot => slot.value)).toEqual(["09:00-12:00", "12:00-15:00", "15:00-18:00"]);
  });

  it("rejects empty and past delivery dates", () => {
    expect(isValidDeliveryDate("")).toBe(false);
    expect(isValidDeliveryDate("2000-01-01")).toBe(false);
  });

  it("accepts a valid future selection and formats its date", () => {
    expect(isValidDeliverySelection("2099-06-18", "12:00-15:00")).toBe(true);
    expect(isValidDeliverySelection("2099-06-18", "08:00-09:00")).toBe(false);
    expect(formatDeliveryDate("2099-06-18")).toMatch(/Jun 18/);
  });

  it("marks preview sell-out dates and Sundays unavailable for delivery", () => {
    expect(isDeliveryDateUnavailable(new Date("2026-09-13T12:00:00"))).toBe(true);
    expect(isDeliveryDateUnavailable(new Date("2026-09-09T12:00:00"))).toBe(true);
    expect(isDeliveryDateUnavailable(new Date("2026-09-10T12:00:00"))).toBe(false);
  });

  it("allows studio pickup on an unavailable delivery date", () => {
    expect(isValidDeliverySelection("2099-09-13", "09:00-12:00")).toBe(false);
    expect(isValidDeliverySelection("2099-09-13", "09:00-12:00", "pickup")).toBe(true);
  });
});
