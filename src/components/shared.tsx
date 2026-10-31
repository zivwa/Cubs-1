import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Search,
  MapPin,
  Phone,
  Clock,
  Check,
  Menu as MenuIcon,
  LayoutDashboard,
  CalendarDays,
  Receipt,
  Wallet,
  Package,
  Users,
  Settings as SettingsIcon,
  Flower2,
  ChevronRight,
  Coffee,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { photos, type Product } from "../menu";
import {
  load,
  seed,
  money,
  uid,
  totals,
  fulfillmentError,
  capacityUsed,
  localDate,
  localTime,
  dateDisplay,
  eligible,
  type Data,
  type Line,
  type Order,
  type Reservation,
} from "../data";
import { useData } from "../state";
export function Img({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return failed ? (
    <div className={`image-fallback ${className}`}>
      <Coffee size={44} />
      <span>{alt}</span>
    </div>
  ) : (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Cubs Bakery & Cakes home">
      <img
        src="/cubs-logo.png"
        alt="Cubs Bakery & Cakes paw logo"
      />
      <small>BAKERY & CAKES</small>
    </Link>
  );
}
export function DemoSwitch({ admin = false }: { admin?: boolean }) {
  return (
    <div
      className="demo-switch"
      title="Demonstration switch; no secure authentication"
    >
      <span>DEMO</span>
      <Link className={!admin ? "active" : ""} to="/">
        Customer
      </Link>
      <Link className={admin ? "active" : ""} to="/admin">
        Admin
      </Link>
    </div>
  );
}
export function addLine(
  p: Product,
  qty: number,
  update: ReturnType<typeof useData>["update"],
  message = "",
  variant = "",
) {
  update((d) => {
    const i = d.cart.findIndex(
      (l) =>
        l.productId === p.id && l.message === message && l.variant === variant,
    );
    const cart = [...d.cart];
    if (i >= 0) cart[i] = { ...cart[i], qty: Math.min(99, cart[i].qty + qty) };
    else
      cart.push({
        productId: p.id,
        name: p.name,
        price: p.price!,
        qty,
        message,
        variant,
      });
    return { ...d, cart };
  });
}
export function ProductCard({ p }: { p: Product }) {
  const { update, notify } = useData();
  return (
    <article className="product-card">
      <Link to={`/product/${p.id}`} className="product-image">
        <Img src={p.image} alt={`${p.name} · illustrative photo`} />
        {p.cake && <span className="product-tag">CELEBRATION FAVOURITE</span>}
      </Link>
      <div className="product-meta">
        {p.category}
        <span>{p.name.toLowerCase().includes("eggless") ? "Eggless" : ""}</span>
      </div>
      <Link className="product-name" to={`/product/${p.id}`}>
        {p.name}
      </Link>
      <div className="product-bottom">
        <strong>
          {p.price === null ? "Price under review" : money(p.price)}
        </strong>
        {p.cake ? (
          <Link
            className="round-button"
            aria-label={`View ${p.name}`}
            to={`/product/${p.id}`}
          >
            <ArrowUpRight size={19} />
          </Link>
        ) : (
          <button
            className="round-button"
            disabled={!p.available || p.price === null}
            aria-label={`Add ${p.name}`}
            onClick={() => {
              addLine(p, 1, update);
              notify(`${p.name} added to your bag`);
            }}
          >
            <Plus size={19} />
          </button>
        )}
      </div>
      {!p.available && <span className="error">Currently unavailable</span>}
    </article>
  );
}
export function Quantity({
  value,
  set,
}: {
  value: number;
  set: (n: number) => void;
}) {
  return (
    <div className="quantity">
      <button
        aria-label="Decrease quantity"
        onClick={() => set(Math.max(1, value - 1))}
        disabled={value <= 1}
      >
        <Minus size={14} />
      </button>
      <span>{value}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => set(Math.min(99, value + 1))}
        disabled={value >= 99}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
export function PriceSummary({
  t,
}: {
  t: { subtotal: number; discount: number; fee: number; total: number };
}) {
  return (
    <>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{money(t.subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>Discount</span>
        <span>−{money(t.discount)}</span>
      </div>
      <div className="summary-row">
        <span>Delivery</span>
        <span>{money(t.fee)}</span>
      </div>
      <div className="summary-row total">
        <strong>Total</strong>
        <strong>{money(t.total)}</strong>
      </div>
    </>
  );
}
export function Badge({ text }: { text: string }) {
  return <span className={`badge ${text.replaceAll(" ", "-")}`}>{text}</span>;
}
