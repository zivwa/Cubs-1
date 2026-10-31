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
  monthKey,
  type Data,
  type Line,
  type Order,
  type Reservation,
} from "../data";
import {
  Img,
  Brand,
  DemoSwitch,
  addLine,
  ProductCard,
  Quantity,
  PriceSummary,
  Badge,
} from "../components/shared";
import { useData } from "../state";
const adminLinks = [
  ["", "Dashboard", LayoutDashboard],
  ["reservations", "Reservations", CalendarDays],
  ["orders", "Orders", Receipt],
  ["payments", "Payments", Wallet],
  ["products", "Menu & Products", Package],
  ["retention", "Customer Retention", Users],
  ["settings", "Settings", SettingsIcon],
] as const;
const blankProduct: Product = {
  id: "",
  name: "",
  category: "Pastries",
  price: null,
  description: "",
  available: true,
  image: "",
  variants: "",
};
export function Admin() {
  const [open, setOpen] = useState(false);
  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${open ? "expanded" : ""}`}>
        <Brand />
        <p className="owner-label">THE BAKERY DESK</p>
        <nav>
          {adminLinks.map(([path, label, Icon]) => (
            <NavLink
              key={path}
              end
              to={`/admin${path ? "/" + path : ""}`}
              onClick={() => setOpen(false)}
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          Cubs, Gokulam<small>Owner workspace</small>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <button
            className="mobile-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle admin navigation"
          >
            <MenuIcon />
          </button>
          <span>One bakery. A whole lot of happiness.</span>
          <DemoSwitch admin />
        </header>
        <div className="admin-content">
          <div className="demo-notice">
            Demo workspace · Fictional seeded records marked “Demo”. Payments
            simulated. No secure authentication.
          </div>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="reservations" element={<AdminReservations />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="retention" element={<Retention />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
function Dashboard() {
  const { data } = useData();
  const [range, setRange] = useState(6);
  const month = localDate().slice(0, 7);
  const year = Number(month.slice(0, 4)),
    monthIndex = Number(month.slice(5)) - 1;
  const start = new Date(`${month}-01T00:00:00+05:30`);
  const paid = data.orders.filter(
    (o) => eligible(o) && monthKey(o.created) === month,
  );
  const revenue = paid.reduce((s, o) => s + o.total, 0);
  const points = Array.from({ length: range }, (_, i) => {
    const date = new Date(Date.UTC(year, monthIndex - range + i + 1, 1, 12));
    return {
      month: date.toLocaleDateString("en-IN", {
        month: "short",
        year: "2-digit",
        timeZone: "Asia/Kolkata",
      }),
      revenue: data.orders
        .filter(
          (o) =>
            eligible(o) && monthKey(o.created) === monthKey(date.toISOString()),
        )
        .reduce((s, o) => s + o.total / 100, 0),
    };
  });
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>A good day starts here.</h1>
          <p>Here’s what’s happening at your bakery.</p>
        </div>
        <span>{localDate()} · India time</span>
      </div>
      <div className="kpis">
        {[
          ["Revenue this month", money(revenue)],
          ["Paid orders", paid.length],
          [
            "Average paid order",
            money(paid.length ? Math.round(revenue / paid.length) : 0),
          ],
          [
            "Pending orders",
            data.orders.filter(
              (o) => !["completed", "cancelled"].includes(o.status),
            ).length,
          ],
        ].map(([name, value]) => (
          <div key={name}>
            <span>{name}</span>
            <strong>{value}</strong>
            <small>
              {start.toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
                timeZone: "Asia/Kolkata",
              })}
            </small>
          </div>
        ))}
      </div>
      <section className="admin-panel">
        <div className="section-heading">
          <div>
            <h2>A little growth, every month.</h2>
            <p>
              Collected amounts after discounts and delivery, less full refunds.
            </p>
          </div>
          <select
            aria-label="Revenue date range"
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
          >
            <option value={3}>Last 3 months</option>
            <option value={6}>Last 6 months</option>
            <option value={12}>Last 12 months</option>
          </select>
        </div>
        <div className="chart">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={points}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `₹${v}`} />
              <Tooltip formatter={(v) => `₹${v}`} />
              <Bar
                dataKey="revenue"
                fill="#934b38"
                radius={[5, 5, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <div className="admin-two">
        <section className="admin-panel">
          <div className="section-heading">
            <h2>Fresh from the counter</h2>
            <Link to="/admin/orders">All orders</Link>
          </div>
          {data.orders.slice(0, 5).map((o) => (
            <div className="history-row" key={o.id}>
              <div>
                {o.customer}
                <small>
                  {o.id} {o.demo ? "· Demo" : ""}
                </small>
              </div>
              <div>
                {money(o.total)}
                <small>
                  <Badge text={o.status} />
                </small>
              </div>
            </div>
          ))}
        </section>
        <section className="admin-panel">
          <h2>On your radar</h2>
          <p>
            Upcoming active reservations:{" "}
            {
              data.reservations.filter(
                (r) =>
                  r.date >= localDate() &&
                  ["pending", "confirmed"].includes(r.status),
              ).length
            }
          </p>
          <p>Details needing review: {data.reviews.length}</p>
          <p>
            Unavailable products:{" "}
            {data.products.filter((p) => !p.available && !p.archived).length}
          </p>
          <Link to="/admin/products">Review your menu →</Link>
        </section>
      </div>
    </>
  );
}
function AdminOrders() {
  const { data, update, notify } = useData();
  const [search, setSearch] = useState(""),
    [filter, setFilter] = useState("all"),
    [selected, setSelected] = useState("");
  const orders = data.orders.filter(
    (o) =>
      `${o.id} ${o.customer} ${o.phone}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filter === "all" || o.status === filter),
  );
  return (
    <>
      <h1>Orders</h1>
      <p>From the first bite to the last happy customer.</p>
      <div className="toolbar">
        <input
          aria-label="Search orders"
          placeholder="Search name, mobile or reference"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          aria-label="Filter order status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {[
            "all",
            "placed",
            "confirmed",
            "preparing",
            "ready",
            "out for delivery",
            "completed",
            "cancelled",
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Fulfillment</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <React.Fragment key={o.id}>
                <tr>
                  <td>
                    {o.id}
                    <small>
                      {o.demo ? "Demo data" : dateDisplay(o.created)}
                    </small>
                  </td>
                  <td>
                    {o.customer}
                    <small>{o.phone}</small>
                  </td>
                  <td>
                    {o.mode}
                    <small>{dateDisplay(o.when)}</small>
                  </td>
                  <td>{money(o.total)}</td>
                  <td>
                    <Badge text={o.payment} />
                  </td>
                  <td>
                    <select
                      aria-label={`Status ${o.id}`}
                      value={o.status}
                      onChange={(e) => {
                        const status = e.target.value;
                        if (
                          status === "cancelled" &&
                          !confirm(
                            "Cancel this order? Payment is separate; refund in Payments if needed.",
                          )
                        )
                          return;
                        update((d) => ({
                          ...d,
                          orders: d.orders.map((x) =>
                            x.id === o.id ? { ...x, status } : x,
                          ),
                        }));
                        notify("Order status saved");
                      }}
                    >
                      {[
                        "placed",
                        "confirmed",
                        "preparing",
                        ...(o.mode === "delivery"
                          ? ["out for delivery"]
                          : ["ready"]),
                        "completed",
                        "cancelled",
                      ].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="secondary"
                      onClick={() => setSelected(selected === o.id ? "" : o.id)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
                {selected === o.id && (
                  <tr>
                    <td colSpan={7}>
                      <div className="order-expanded">
                        <h3>{o.customer}</h3>
                        <p>
                          {o.email} · {o.address || "Pickup at bakery"}
                          <br />
                          Notes: {o.notes || "None"}
                        </p>
                        {o.items.map((l, i) => (
                          <p key={i}>
                            {l.qty} × {l.name} · {money(l.price)} each ·{" "}
                            {l.variant} {l.message}
                          </p>
                        ))}
                        <PriceSummary t={o} />
                        <Link to={`/orders/${o.id}`}>Customer tracking</Link>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {!orders.length && <p className="empty">No matching orders.</p>}
      </div>
    </>
  );
}
function AdminReservations() {
  const { data, update, notify } = useData();
  const [date, setDate] = useState(""),
    [status, setStatus] = useState("all");
  function change(r: Reservation, status: string) {
    if (
      status === "confirmed" &&
      capacityUsed(
        data.reservations,
        r.date,
        r.time,
        data.settings.slotMinutes,
        r.id,
      ) +
        r.party >
        data.settings.capacity
    ) {
      notify("Capacity exceeded. Try another slot.");
      return;
    }
    if (
      ["cancelled", "declined"].includes(status) &&
      !confirm(`Set reservation ${r.id} to ${status}?`)
    )
      return;
    update((d) => ({
      ...d,
      reservations: d.reservations.map((x) =>
        x.id === r.id ? { ...x, status } : x,
      ),
    }));
    notify("Reservation updated");
  }
  return (
    <>
      <h1>A place at the table.</h1>
      <div className="toolbar">
        <label>
          Reservation date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {[
              "all",
              "pending",
              "confirmed",
              "declined",
              "cancelled",
              "completed",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <button
          className="secondary"
          onClick={() => {
            setDate("");
            setStatus("all");
          }}
        >
          Clear filters
        </button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Date & time (India)</th>
              <th>Party</th>
              <th>Notes / reference</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.reservations
              .filter(
                (r) =>
                  (!date || r.date === date) &&
                  (status === "all" || r.status === status),
              )
              .map((r) => (
                <tr key={r.id}>
                  <td>
                    {r.name}
                    <small>
                      {r.phone} {r.demo ? "· Demo" : ""}
                    </small>
                  </td>
                  <td>
                    {r.date}
                    <small>{r.time}</small>
                  </td>
                  <td>{r.party}</td>
                  <td>
                    {r.notes}
                    <small>{r.id}</small>
                  </td>
                  <td>
                    <select
                      aria-label={`Reservation status ${r.id}`}
                      value={r.status}
                      onChange={(e) => change(r, e.target.value)}
                    >
                      {[
                        "pending",
                        "confirmed",
                        "declined",
                        "cancelled",
                        "completed",
                      ].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p className="notice">
        Demo: {data.settings.capacity} guests per {data.settings.slotMinutes}
        -minute slot. Overlapping confirmed bookings count toward capacity.
      </p>
    </>
  );
}
function AdminPayments() {
  const { data, update, notify } = useData();
  const [filter, setFilter] = useState("all");
  return (
    <>
      <h1>Payments, made clear.</h1>
      <p>Simulated transactions. No real money moves.</p>
      <label className="inline-label">
        Payment state
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {["all", "successful", "pending", "failed", "refunded"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Order</th>
              <th>Amount</th>
              <th>Date</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.payments
              .filter((p) => filter === "all" || p.state === filter)
              .map((p) => {
                const o = data.orders.find((o) => o.id === p.orderId);
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.orderId}</td>
                    <td>{money(p.amount)}</td>
                    <td>{dateDisplay(p.date)}</td>
                    <td>
                      <Badge text={p.state} />
                    </td>
                    <td>
                      {p.state === "successful" && o?.payment === "paid" && (
                        <button
                          className="secondary"
                          onClick={() => {
                            if (
                              !confirm(
                                `Simulate full refund of ${money(p.amount)}?`,
                              )
                            )
                              return;
                            update((d) => ({
                              ...d,
                              orders: d.orders.map((x) =>
                                x.id === p.orderId
                                  ? { ...x, payment: "refunded" }
                                  : x,
                              ),
                              payments: d.payments.map((x) =>
                                x.id === p.id ? { ...x, state: "refunded" } : x,
                              ),
                            }));
                            notify(
                              "Full refund recorded. Revenue and loyalty updated.",
                            );
                          }}
                        >
                          Simulate full refund
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
function AdminProducts() {
  const { data, update, notify } = useData();
  const [search, setSearch] = useState(""),
    [edit, setEdit] = useState<Product | null>(null),
    [price, setPrice] = useState("");
  function open(p: Product) {
    setEdit({ ...p });
    setPrice(p.price === null ? "" : String(p.price / 100));
  }
  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!edit) return;
    const p = {
      ...edit,
      id: edit.id || uid("PRODUCT"),
      price: price === "" ? null : Math.round(Number(price) * 100),
    };
    update((d) => ({
      ...d,
      products: d.products.some((x) => x.id === p.id)
        ? d.products.map((x) => (x.id === p.id ? p : x))
        : [p, ...d.products],
    }));
    setEdit(null);
    notify("Product saved. Customer menu updated.");
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <h1>Made for your menu.</h1>
          <p>
            {data.products.filter((p) => !p.archived).length} products ·
            extracted from supplied menu
          </p>
        </div>
        <button onClick={() => open(blankProduct)}>
          <Plus size={17} /> Add product
        </button>
      </div>
      <details className="review-list" open>
        <summary>Needs review · {data.reviews.length} items</summary>
        {data.reviews.map((r, i) => (
          <div className="history-row" key={i}>
            <input
              aria-label={`Review detail ${i + 1}`}
              value={r}
              onChange={(e) =>
                update((d) => ({
                  ...d,
                  reviews: d.reviews.map((s, j) =>
                    j === i ? e.target.value : s,
                  ),
                }))
              }
            />
            <button
              className="secondary"
              onClick={() => {
                if (confirm("Mark this detail as reviewed and resolved?"))
                  update((d) => ({
                    ...d,
                    reviews: d.reviews.filter((_, j) => j !== i),
                  }));
              }}
            >
              Resolve
            </button>
          </div>
        ))}
      </details>
      {edit && (
        <form className="admin-panel product-form" onSubmit={save}>
          <div className="section-heading">
            <h2>{edit.id ? "Edit product" : "Add product"}</h2>
            <button
              type="button"
              className="icon-button"
              aria-label="Close editor"
              onClick={() => setEdit(null)}
            >
              <X />
            </button>
          </div>
          <div className="form-grid">
            <label>
              Product name
              <input
                required
                value={edit.name}
                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              />
            </label>
            <label>
              Category
              <input
                required
                value={edit.category}
                onChange={(e) => setEdit({ ...edit, category: e.target.value })}
              />
            </label>
            <label>
              Price in ₹ (blank = unconfirmed)
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label>
              Photo URL
              <input
                type="url"
                value={edit.image.startsWith("data:") ? "" : edit.image}
                onChange={(e) => setEdit({ ...edit, image: e.target.value })}
              />
            </label>
          </div>
          <label>
            Description
            <textarea
              value={edit.description}
              onChange={(e) =>
                setEdit({ ...edit, description: e.target.value })
              }
            />
          </label>
          <label>
            Confirmed variants (separate with |, same listed price)
            <input
              value={edit.variants || ""}
              onChange={(e) => setEdit({ ...edit, variants: e.target.value })}
            />
          </label>
          <label>
            Upload image (max 500 KB)
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                if (f.size > 500000) {
                  notify("Use an image smaller than 500 KB.");
                  return;
                }
                const reader = new FileReader();
                reader.onload = () =>
                  setEdit({ ...edit, image: String(reader.result) });
                reader.onerror = () => notify("Image could not be read.");
                reader.readAsDataURL(f);
              }}
            />
          </label>
          <label className="check-label">
            <input
              type="checkbox"
              checked={!!edit.cake}
              onChange={(e) => setEdit({ ...edit, cake: e.target.checked })}
            />{" "}
            Cake preorder (requires lead time)
          </label>
          <button type="submit">Save product</button>
        </form>
      )}
      <input
        aria-label="Search products"
        placeholder="Find a product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.products
              .filter(
                (p) =>
                  !p.archived &&
                  p.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>
                    {p.price === null ? (
                      <Badge text="needs review" />
                    ) : (
                      money(p.price)
                    )}
                  </td>
                  <td>
                    <button
                      className={`toggle ${p.available ? "on" : ""}`}
                      role="switch"
                      aria-checked={p.available}
                      aria-label={`Availability ${p.name}`}
                      onClick={() => {
                        update((d) => ({
                          ...d,
                          products: d.products.map((x) =>
                            x.id === p.id
                              ? { ...x, available: !x.available }
                              : x,
                          ),
                        }));
                        notify("Availability updated");
                      }}
                    >
                      <span />
                      {p.available ? "On" : "Off"}
                    </button>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="secondary" onClick={() => open(p)}>
                        Edit
                      </button>
                      <button
                        className="text-button"
                        onClick={() => {
                          if (
                            confirm(
                              `Archive ${p.name}? Historical orders are preserved.`,
                            )
                          ) {
                            update((d) => ({
                              ...d,
                              products: d.products.map((x) =>
                                x.id === p.id ? { ...x, archived: true } : x,
                              ),
                            }));
                            notify("Product archived");
                          }
                        }}
                      >
                        Archive
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function Retention() {
  const { data, update, notify } = useData();
  const [selected, setSelected] = useState("");
  const customers = [...new Set(data.orders.map((o) => o.phone))].map(
    (phone) => {
      const orders = data.orders.filter((o) => o.phone === phone),
        paid = orders.filter(eligible),
        spend = paid.reduce((s, o) => s + o.total, 0),
        last = orders.reduce((a, o) => (o.created > a ? o.created : a), "");
      return {
        phone,
        name: orders[0].customer,
        orders,
        spend,
        points: Math.floor(spend / data.settings.points),
        last,
        repeat: paid.length > 1,
        inactive:
          (Date.now() - new Date(last).getTime()) / 86400000 >=
          data.settings.inactiveDays,
      };
    },
  );
  return (
    <>
      <h1>Keep the good company coming.</h1>
      <p>
        History and loyalty calculated from shared records. No messages are
        sent.
      </p>
      <section className="admin-panel">
        <div className="section-heading">
          <div>
            <h2>A reason to come back.</h2>
            <p>
              Sample code: <strong>{data.settings.discountCode}</strong> ·{" "}
              {data.settings.discountPercent}% off
            </p>
          </div>
          <button
            onClick={() => {
              const code = `CUBS${Math.floor(1000 + Math.random() * 9000)}`;
              update((d) => ({
                ...d,
                settings: { ...d.settings, discountCode: code },
              }));
              notify(`Sample code ${code} generated. Use it at checkout.`);
            }}
          >
            Generate sample code
          </button>
        </div>
        <p>
          1 point per {money(data.settings.points)} paid, including delivery
          after discounts. Refunded orders earn no points. Inactive after{" "}
          {data.settings.inactiveDays} days. Edit rules in Settings.
        </p>
      </section>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Relationship</th>
              <th>Net spending</th>
              <th>Loyalty</th>
              <th>Last order</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <React.Fragment key={c.phone}>
                <tr>
                  <td>
                    {c.name}
                    <small>{c.phone}</small>
                  </td>
                  <td>
                    <Badge text={c.repeat ? "repeat" : "new"} />
                    {c.inactive && <Badge text="inactive" />}
                  </td>
                  <td>{money(c.spend)}</td>
                  <td>{c.points} points</td>
                  <td>{dateDisplay(c.last)}</td>
                  <td>
                    <button
                      className="secondary"
                      onClick={() =>
                        setSelected(selected === c.phone ? "" : c.phone)
                      }
                    >
                      History
                    </button>
                  </td>
                </tr>
                {selected === c.phone && (
                  <tr>
                    <td colSpan={6}>
                      {c.orders.map((o) => (
                        <p key={o.id}>
                          {o.id} · {o.items.map((l) => l.name).join(", ")} ·{" "}
                          {money(o.total)} · {o.payment}
                        </p>
                      ))}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function AdminSettings() {
  const { data, update, notify } = useData();
  const [s, setS] = useState({ ...data.settings });
  function save(e: React.FormEvent) {
    e.preventDefault();
    if (s.open >= s.close) {
      notify("Closing time must be later than opening time.");
      return;
    }
    update((d) => ({ ...d, settings: s }));
    notify("Settings saved");
  }
  const input = (
    key: keyof typeof s,
    label: string,
    type = "text",
    min?: number,
    max?: number,
  ) => (
    <label key={key}>
      {label}
      <input
        type={type}
        min={min}
        max={max}
        required
        value={String(s[key])}
        onChange={(e) =>
          setS({
            ...s,
            [key]: type === "number" ? Number(e.target.value) : e.target.value,
          })
        }
      />
    </label>
  );
  return (
    <>
      <h1>The way your bakery works.</h1>
      <p>
        Operating assumptions are marked and editable. All bookings use
        Asia/Kolkata.
      </p>
      <form className="admin-panel" onSubmit={save}>
        <h2>Business details</h2>
        <div className="form-grid">
          {input("name", "Business name")}
          {input("phone", "Telephone")}
          {input("address", "Business address")}
        </div>
        <h2>Hours & fulfillment</h2>
        <div className="form-grid">
          {input("open", "Opening time · demo assumption", "time")}
          {input("close", "Closing time · supplied screenshot", "time")}
          {input("fee", "Delivery fee in paise · demo", "number", 0)}
          {input("coverage", "Delivery service rule · demo")}
          {input("lead", "Cake lead time (hours) · demo", "number", 0)}
          {input("capacity", "Reservation guest capacity · demo", "number", 1)}
          {input("slotMinutes", "Slot duration (minutes) · demo", "number", 15)}
        </div>
        <div className="actions">
          {(["pickup", "delivery"] as const).map((k) => (
            <label className="check-label" key={k}>
              <input
                type="checkbox"
                checked={s[k]}
                onChange={(e) => setS({ ...s, [k]: e.target.checked })}
              />
              {k} enabled · demo
            </label>
          ))}
        </div>
        <h2>Loyalty & sample discounts</h2>
        <div className="form-grid">
          {input("points", "Paise spent per loyalty point · demo", "number", 1)}
          {input(
            "inactiveDays",
            "Inactive threshold (days) · demo",
            "number",
            1,
          )}
          {input("discountCode", "Sample discount code · demo")}
          {input(
            "discountPercent",
            "Discount percentage · demo",
            "number",
            0,
            100,
          )}
        </div>
        <button type="submit">Save settings</button>
      </form>
      <section className="admin-panel">
        <h2>Start fresh</h2>
        <p>
          Restore the extracted menu, fictional records and demo rules. Removes
          new orders, reservations, products and uploads.
        </p>
        <button
          className="danger"
          onClick={() => {
            if (confirm("Reset all demo data? This cannot be undone.")) {
              const fresh = seed();
              update(() => fresh);
              setS({ ...fresh.settings });
              notify("Demo data restored");
            }
          }}
        >
          Reset demo data
        </button>
      </section>
    </>
  );
}
