import { menu, initialReviews, type Product } from "./menu";
export const money = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n / 100);
export type Line = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  message?: string;
  variant?: string;
};
export type Order = {
  id: string;
  customer: string;
  phone: string;
  email: string;
  address: string;
  mode: string;
  when: string;
  items: Line[];
  subtotal: number;
  discount: number;
  fee: number;
  total: number;
  payment: string;
  status: string;
  created: string;
  demo?: boolean;
  notes?: string;
};
export type Payment = {
  id: string;
  orderId: string;
  amount: number;
  state: string;
  date: string;
};
export type Reservation = {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  party: number;
  notes: string;
  status: string;
  demo?: boolean;
};
export type Settings = {
  name: string;
  address: string;
  phone: string;
  open: string;
  close: string;
  pickup: boolean;
  delivery: boolean;
  fee: number;
  coverage: string;
  lead: number;
  capacity: number;
  slotMinutes: number;
  points: number;
  inactiveDays: number;
  discountCode: string;
  discountPercent: number;
  timezone: string;
};
export type Data = {
  products: Product[];
  orders: Order[];
  payments: Payment[];
  reservations: Reservation[];
  settings: Settings;
  reviews: string[];
  cart: Line[];
  history: string[];
  reservationHistory: string[];
};
export const uid = (prefix: string) =>
  `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
export function seed(): Data {
  const now = new Date();
  const orders: Order[] = Array.from({ length: 18 }, (_, i) => {
    const p = menu[(i * 7) % menu.length],
      qty = (i % 3) + 1,
      date = new Date(now);
    date.setDate(now.getDate() - i * 3);
    return {
      id: `DEMO-${1001 + i}`,
      customer: [
        "Ananya Rao",
        "Rohan Shah",
        "Meera Kumar",
        "Arjun Nair",
        "Kavya Singh",
      ][i % 5],
      phone: `987650000${i % 5}`,
      email: "",
      address: "Mysuru · fictional demo customer",
      mode: i % 3 ? "pickup" : "delivery",
      when: new Date(date.getTime() + 3600000).toISOString(),
      items: [{ productId: p.id, name: p.name, price: p.price!, qty }],
      subtotal: p.price! * qty,
      discount: 0,
      fee: i % 3 ? 0 : 4000,
      total: p.price! * qty + (i % 3 ? 0 : 4000),
      payment: i === 0 ? "pending" : "paid",
      status: i < 3 ? "confirmed" : "completed",
      created: date.toISOString(),
      demo: true,
    };
  });
  return {
    products: menu,
    orders,
    payments: orders.map((o) => ({
      id: `TX-${o.id}`,
      orderId: o.id,
      amount: o.total,
      state: o.payment === "paid" ? "successful" : "pending",
      date: o.created,
    })),
    reservations: [
      {
        id: "DEMO-R1001",
        name: "Ananya Rao",
        phone: "9876500000",
        date: localDate(),
        time: "18:00",
        party: 3,
        notes: "Fictional demo reservation",
        status: "pending",
        demo: true,
      },
    ],
    settings: {
      name: "Cubs Bakery & Cakes",
      address:
        "No.39, 2, Gokulam Main Rd, Gokulam 2nd Stage, Vani Vilas Mohalla, Mysuru, Karnataka 570002",
      phone: "0821 424 6688",
      open: "09:00",
      close: "23:30",
      pickup: true,
      delivery: true,
      fee: 4000,
      coverage:
        "Demo: delivery within Mysuru. Address is reviewed by the bakery.",
      lead: 24,
      capacity: 20,
      slotMinutes: 60,
      points: 10000,
      inactiveDays: 30,
      discountCode: "CUBS10",
      discountPercent: 10,
      timezone: "Asia/Kolkata",
    },
    reviews: initialReviews,
    cart: [],
    history: [],
    reservationHistory: [],
  };
}
export function localDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
export function localTime() {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  return parts.replace(" ", "T");
}
export const dateDisplay = (s: string) =>
  new Date(s).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
export function eligible(o: Order) {
  return o.payment === "paid";
}
export function monthKey(timestamp: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
  }).format(new Date(timestamp));
}
export function totals(
  items: Line[],
  settings: Settings,
  mode: string,
  code: string,
) {
  const subtotal = items.reduce((s, l) => s + l.price * l.qty, 0);
  const discount =
    code.trim().toUpperCase() === settings.discountCode.toUpperCase()
      ? Math.round((subtotal * settings.discountPercent) / 100)
      : 0;
  const fee = mode === "delivery" ? settings.fee : 0;
  return { subtotal, discount, fee, total: subtotal - discount + fee };
}
export function fulfillmentError(when: string, items: Line[], data: Data) {
  const date = new Date(when + "+05:30");
  if (!when || !Number.isFinite(date.getTime()) || date.getTime() < Date.now())
    return "Choose a future date and time.";
  const time = when.slice(11, 16);
  if (time < data.settings.open || time > data.settings.close)
    return `Choose a time between ${data.settings.open} and ${data.settings.close} (India time).`;
  if (
    items.some((l) => data.products.find((p) => p.id === l.productId)?.cake) &&
    date.getTime() < Date.now() + data.settings.lead * 3600000
  )
    return `Cake preorders need ${data.settings.lead} hours notice.`;
  return "";
}
export function capacityUsed(
  rs: Reservation[],
  date: string,
  time: string,
  minutes: number,
  exclude = "",
) {
  return rs
    .filter(
      (r) =>
        r.id !== exclude &&
        r.date === date &&
        r.status === "confirmed" &&
        Math.abs(
          Number(r.time.slice(0, 2)) * 60 +
            Number(r.time.slice(3)) -
            (Number(time.slice(0, 2)) * 60 + Number(time.slice(3))),
        ) < minutes,
    )
    .reduce((s, r) => s + r.party, 0);
}
export function load(): { data: Data; warning: string } {
  try {
    const raw = localStorage.getItem("cubs-v1");
    if (!raw) return { data: seed(), warning: "" };
    const d = JSON.parse(raw);
    if (
      !Array.isArray(d.products) ||
      !Array.isArray(d.orders) ||
      !Array.isArray(d.payments) ||
      !Array.isArray(d.reservations) ||
      !Array.isArray(d.cart) ||
      !d.settings ||
      !Array.isArray(d.history) ||
      !Array.isArray(d.reviews) ||
      !Array.isArray(d.reservationHistory) ||
      !validData(d)
    )
      throw Error();
    return { data: d, warning: "" };
  } catch {
    return {
      data: seed(),
      warning:
        "Saved data could not be read. A fresh demo is loaded; damaged storage has not been overwritten until your next change.",
    };
  }
}

export function validData(d: Data): boolean {
  try {
    const str = (x: unknown) => typeof x === "string";
    const amount = (x: unknown) =>
      typeof x === "number" && Number.isSafeInteger(x) && x >= 0;
    const line = (l: Line) =>
      str(l.productId) &&
      str(l.name) &&
      amount(l.price) &&
      Number.isInteger(l.qty) &&
      l.qty > 0 &&
      l.qty <= 99 &&
      (l.message === undefined || str(l.message)) &&
      (l.variant === undefined || str(l.variant));
    const settings = d.settings;
    return (
      d.products.every(
        (p) =>
          str(p.id) &&
          str(p.name) &&
          str(p.category) &&
          str(p.image) &&
          str(p.description) &&
          (p.variants === undefined || str(p.variants)) &&
          (p.price === null || amount(p.price)) &&
          typeof p.available === "boolean",
      ) &&
      d.cart.every(line) &&
      d.orders.every(
        (o) =>
          str(o.id) &&
          str(o.customer) &&
          str(o.phone) &&
          str(o.email) &&
          str(o.address) &&
          ["pickup", "delivery"].includes(o.mode) &&
          [
            "placed",
            "confirmed",
            "preparing",
            "ready",
            "out for delivery",
            "completed",
            "cancelled",
          ].includes(o.status) &&
          (o.notes === undefined || str(o.notes)) &&
          Array.isArray(o.items) &&
          o.items.every(line) &&
          [o.total, o.subtotal, o.discount, o.fee].every(amount) &&
          ["paid", "pending", "failed", "refunded"].includes(o.payment) &&
          Number.isFinite(Date.parse(o.when)) &&
          Number.isFinite(Date.parse(o.created)),
      ) &&
      d.payments.every(
        (p) =>
          str(p.id) &&
          str(p.orderId) &&
          amount(p.amount) &&
          ["successful", "pending", "failed", "refunded"].includes(p.state) &&
          Number.isFinite(Date.parse(p.date)),
      ) &&
      d.reservations.every(
        (r) =>
          str(r.id) &&
          str(r.name) &&
          str(r.phone) &&
          /^\d{4}-\d{2}-\d{2}$/.test(r.date) &&
          /^\d{2}:\d{2}$/.test(r.time) &&
          Number.isInteger(r.party) &&
          r.party > 0 &&
          str(r.notes) &&
          [
            "pending",
            "confirmed",
            "declined",
            "cancelled",
            "completed",
          ].includes(r.status),
      ) &&
      d.history.every(str) &&
      d.reservationHistory.every(str) &&
      d.reviews.every(str) &&
      str(settings.address) &&
      str(settings.name) &&
      str(settings.coverage) &&
      typeof settings.pickup === "boolean" &&
      typeof settings.delivery === "boolean" &&
      str(settings.phone) &&
      /^\d{2}:\d{2}$/.test(settings.open) &&
      /^\d{2}:\d{2}$/.test(settings.close) &&
      amount(settings.fee) &&
      settings.capacity > 0 &&
      settings.slotMinutes >= 15 &&
      settings.points > 0 &&
      settings.lead >= 0 &&
      settings.discountPercent >= 0 &&
      settings.discountPercent <= 100 &&
      str(settings.discountCode)
    );
  } catch {
    return false;
  }
}
