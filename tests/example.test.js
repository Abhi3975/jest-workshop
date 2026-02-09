const { calculateFinalAmount } = require("../src/pricing");

describe("calculateFinalAmount", () => {
  test("no coupon case", () => {
    expect(calculateFinalAmount(100)).toBe(100);
  });

  test("SAVE10 coupon gives 10% discount", () => {
    expect(calculateFinalAmount(200, "SAVE10")).toBe(180);
  });

  test("case-insensitive coupon works", () => {
    expect(calculateFinalAmount(200, "save10")).toBe(180);
    expect(calculateFinalAmount(200, "SaVe10")).toBe(180);
  });

  test("FLAT50 boundary case (subtotal exactly 50)", () => {
    expect(calculateFinalAmount(50, "FLAT50")).toBe(0);
  });

  test("FLAT50 should not go below 0", () => {
    expect(calculateFinalAmount(30, "FLAT50")).toBe(0);
  });

  test("invalid subtotal throws error", () => {
    expect(() => calculateFinalAmount(-100, "DISCOUNT")).toThrow(
      "Invalid subtotal"
    );
  });
});