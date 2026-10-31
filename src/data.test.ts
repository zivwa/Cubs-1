import { describe, it, expect } from "vitest";
import { seed, totals, fulfillmentError, capacityUsed, eligible } from "./data";
import { menu } from "./menu";
describe("shared bakery rules", () => {
  it("transcribes a unique purchasable menu in integer paise", () => {
    expect(menu.length).toBeGreaterThan(120);
    expect(new Set(menu.map((p) => p.id)).size).toBe(menu.length);
    expect(menu.every((p) => Number.isInteger(p.price) && p.price! >= 0)).toBe(
      true,
    );
    expect(menu.find((p) => p.name === "Milk Bread")?.price).toBe(5500);
  });
  it("calculates discount and delivery in paise", () => {
    const d = seed();
    const lines = [{ productId: "x", name: "Cookies", price: 5500, qty: 3 }];
    expect(totals(lines, d.settings, "delivery", "cubs10")).toEqual({
      subtotal: 16500,
      discount: 1650,
      fee: 4000,
      total: 18850,
    });
    expect(totals(lines, d.settings, "pickup", "INVALID").total).toBe(16500);
  });
  it("seeds internally consistent orders and payments", () => {
    const d = seed();
    for (const o of d.orders) {
      expect(o.subtotal).toBe(o.items.reduce((s, l) => s + l.price * l.qty, 0));
      expect(o.total).toBe(o.subtotal - o.discount + o.fee);
      expect(d.payments.find((p) => p.orderId === o.id)?.amount).toBe(o.total);
      expect(
        o.items.every((l) =>
          d.products.some((p) => p.id === l.productId && p.price === l.price),
        ),
      ).toBe(true);
    }
  });
  it("excludes pending, failed and refunded amounts from revenue and loyalty", () => {
    const o = seed().orders[1];
    expect(eligible(o)).toBe(true);
    for (const payment of ["pending", "failed", "refunded"])
      expect(eligible({ ...o, payment })).toBe(false);
  });
  it("rejects past, closed-hours and insufficient cake lead time", () => {
    const d = seed();
    expect(fulfillmentError("2020-01-01T12:00", [], d)).toMatch(/future/);
    expect(fulfillmentError("2099-01-01T02:00", [], d)).toMatch(/between/);
    const cake = d.products.find((p) => p.cake)!;
    d.settings.lead = 1000000;
    expect(
      fulfillmentError(
        "2030-01-01T12:00",
        [{ productId: cake.id, name: cake.name, price: cake.price!, qty: 1 }],
        d,
      ),
    ).toMatch(/notice/);
  });
  it("counts overlapping confirmed bookings and excludes the edited booking", () => {
    const r = {
      id: "1",
      name: "Test",
      phone: "9876543210",
      date: "2099-01-01",
      time: "15:00",
      party: 4,
      notes: "",
      status: "confirmed",
    };
    expect(
      capacityUsed(
        [r, { ...r, id: "2", status: "pending" }],
        r.date,
        "15:30",
        60,
      ),
    ).toBe(4);
    expect(capacityUsed([r], r.date, "16:00", 60)).toBe(0);
    expect(capacityUsed([r], r.date, "15:00", 60, "1")).toBe(0);
  });
});
import { validData, monthKey } from "./data";
it("groups reporting months in India even when UTC is in the prior month", () => {
  expect(monthKey("2026-10-31T20:00:00Z")).toBe("2026-11");
  expect(monthKey("2026-10-31T18:00:00Z")).toBe("2026-10");
});
it("rejects corrupt stored money, products and settings without crashing", () => {
  const d = seed();
  expect(validData(d)).toBe(true);
  expect(validData({ ...d, products: [null] } as never)).toBe(false);
  expect(validData({ ...d, settings: { ...d.settings, points: 0 } })).toBe(
    false,
  );
  expect(validData({ ...d, orders: [{ ...d.orders[0], total: NaN }] })).toBe(
    false,
  );
});
