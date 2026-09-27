import { describe, expect, it } from "vitest";

const GIFT_MESSAGE_LIMIT = 180;

function validateGiftMessage(value: string) {
  return value.trim().length <= GIFT_MESSAGE_LIMIT;
}

describe("gift message validation", () => {
  it("accepts an empty note and notes up to the character limit", () => {
    expect(validateGiftMessage("")).toBe(true);
    expect(validateGiftMessage("With love, always.")).toBe(true);
    expect(validateGiftMessage("a".repeat(GIFT_MESSAGE_LIMIT))).toBe(true);
  });

  it("rejects notes beyond the character limit", () => {
    expect(validateGiftMessage("a".repeat(GIFT_MESSAGE_LIMIT + 1))).toBe(false);
  });
});
