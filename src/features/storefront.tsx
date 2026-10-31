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
export function Store() {
  const { data } = useData();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement">
        A little sweetness, a little everyday joy. <span>Made for Mysuru.</span>
        <DemoSwitch />
      </div>
      <header className="store-header">
        <Brand />
        <button
          className="mobile-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <MenuIcon />
        </button>
        <nav className={open ? "nav-open" : ""} onClick={() => setOpen(false)}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/menu">Our menu</NavLink>
          <NavLink to="/reservations">Reserve a table</NavLink>
          <NavLink to="/contact">Visit us</NavLink>
        </nav>
        <Link className="bag" to="/cart" aria-label="Open shopping bag">
          <ShoppingBag size={20} />
          <span>{data.cart.reduce((s, l) => s + l.qty, 0)}</span>
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<History />} />
          <Route path="/orders/:id" element={<Tracking />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <div className="page">
                <h1>Let’s get you back to something sweet.</h1>
                <Link to="/menu">Browse our menu</Link>
              </div>
            }
          />
        </Routes>
      </main>
      <footer>
        <Brand />
        <p>
          For sweet moments.
          <br />
          And everything in between.
        </p>
        <div>
          <Link to="/orders">Your orders</Link>
          <Link to="/reservations">Your reservations</Link>
          <Link to="/contact">Find Cubs</Link>
        </div>
        <small>
          Frontend demo · payments are simulated.
          <br />
          Customer / Admin switch does not provide authentication.
        </small>
      </footer>
    </>
  );
}
function Home() {
  const { data } = useData();
  const selected = [
    "eggless-rasmalai-pastry",
    "chocolate-brownie-1-pcs-",
    "cashewnut-cookies",
    "cold-coffee",
  ]
    .map((id) => data.products.find((p) => p.id === id))
    .filter(Boolean) as Product[];
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-flower">
            <Flower2 size={42} />
          </div>
          <h1>
            A little slice
            <br />
            of <em>happiness.</em>
          </h1>
          <p>
            From a cake worth celebrating to your everyday coffee break. Find
            your happy place at Cubs.
          </p>
          <div className="actions">
            <Link className="button" to="/menu">
              Order now <ArrowRight size={18} />
            </Link>
            <Link className="text-link" to="/reservations">
              Stay for a little while <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-location">
            <MapPin size={17} /> Gokulam, Mysuru <span /> Bakery · Café · Good
            company
          </div>
        </div>
        <div className="hero-photo">
          <Img
            src={photos.cake}
            alt="Illustrative chocolate celebration cake"
          />
          <span className="photo-label">A taste of the good things</span>
          <span className="image-credit">Illustrative photography</span>
          <div className="hero-stamp">
            SWEET MOMENTS
            <Flower2 size={28} />
            <span>START HERE</span>
          </div>
        </div>
      </section>
      <div className="ribbon">
        <span>Cakes for every celebration</span>
        <Flower2 />
        <span>A coffee and a catch-up</span>
        <Flower2 />
        <span>Your everyday favourites</span>
        <Flower2 />
        <span>Something for everyone</span>
      </div>
      <section className="section favourites">
        <div className="section-heading">
          <div>
            <h2>Love at first bite.</h2>
            <p>A few favourites to make your day a little sweeter.</p>
          </div>
          <Link className="text-link" to="/menu">
            Discover the full menu <ArrowRight size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {selected.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <small className="muted">
          Photographs are illustrative, not actual Cubs products.
        </small>
      </section>
      <section className="slow-moments">
        <Img src={photos.coffee} alt="Illustrative iced coffee" />
        <div>
          <Flower2 size={34} />
          <h2>
            Good things.
            <br />
            Great company.
          </h2>
          <p>
            Pull up a chair, order your favourite, and make a little time for
            yourself. We’ll save you a spot in Gokulam.
          </p>
          <Link className="button light" to="/reservations">
            Reserve a table <ArrowUpRight size={18} />
          </Link>
          <small>Illustrative café photography</small>
        </div>
      </section>
      <section className="visit-strip">
        <div>
          <h2>
            There’s a happy place
            <br />
            around the corner.
          </h2>
          <Link to="/contact" className="text-link">
            Come say hello <ArrowRight size={18} />
          </Link>
        </div>
        <div>
          <MapPin />
          <p>{data.settings.address}</p>
        </div>
        <div>
          <Phone />
          <a href={`tel:${data.settings.phone.replaceAll(" ", "")}`}>
            {data.settings.phone}
          </a>
          <p>
            Closes at 11:30 pm
            <br />
            <small>Opening time awaiting confirmation</small>
          </p>
        </div>
      </section>
    </>
  );
}
function MenuPage() {
  const { data } = useData();
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("All favourites");
  const categories = [
    "All favourites",
    ...new Set(data.products.filter((p) => !p.archived).map((p) => p.category)),
  ];
  const products = data.products.filter(
    (p) =>
      !p.archived &&
      (category === "All favourites" || p.category === category) &&
      `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <h1>Find your favourite.</h1>
          <p>Sweet treats, hearty bites, and a little something to sip.</p>
        </div>
        <label className="search">
          <Search size={19} />
          <input
            aria-label="Search menu"
            placeholder="Search for something delicious"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="category-list">
        {categories.map((c) => (
          <button
            className={c === category ? "selected" : ""}
            key={c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="menu-count">
        {products.length} things to love{" "}
        <span>All images illustrative · prices from supplied menu</span>
      </div>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
      {!products.length && (
        <div className="empty">
          <Search />
          <h2>No bites found.</h2>
          <p>Try another search or category.</p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All favourites");
            }}
          >
            Show all products
          </button>
        </div>
      )}
    </section>
  );
}
function ProductPage() {
  const { id } = useParams();
  const { data, update, notify } = useData();
  const p = data.products.find((x) => x.id === id);
  const [qty, setQty] = useState(1),
    [message, setMessage] = useState(""),
    [variant, setVariant] = useState("");
  if (!p || p.archived)
    return (
      <div className="page">
        Product unavailable. <Link to="/menu">Back to menu</Link>
      </div>
    );
  const variants = p.variants?.split("|").filter(Boolean) || [];
  return (
    <section className="page product-detail">
      <div>
        <Img src={p.image} alt={`${p.name} illustrative image`} />
        <small>Illustrative image. Actual product may differ.</small>
      </div>
      <div>
        <Link className="muted" to="/menu">
          Our menu / {p.category}
        </Link>
        <h1>{p.name}</h1>
        <h2>
          {p.price !== null ? money(p.price) : "Price awaiting confirmation"}
        </h2>
        <p>
          {p.description ||
            "Please ask the bakery about ingredients and allergens before ordering."}
        </p>
        {p.cake && (
          <div className="notice">
            Cake preorder · {data.settings.lead} hours notice (demo rule). Size
            and flavour details are awaiting confirmation; this is the listed
            menu item at its displayed price.
          </div>
        )}
        {variants.length > 0 && (
          <label>
            Confirmed variants
            <select
              required
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            >
              <option value="">Choose a variant</option>
              {variants.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        )}
        {p.cake && (
          <label>
            Cake message (optional)
            <input
              maxLength={80}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A little message for your celebration"
            />
          </label>
        )}
        <div className="actions">
          <Quantity value={qty} set={setQty} />
          <button
            disabled={
              !p.available ||
              p.price === null ||
              (variants.length > 0 && !variant)
            }
            onClick={() => {
              addLine(p, qty, update, message, variant);
              notify("Added to your bag");
            }}
          >
            Add to bag <ShoppingBag size={17} />
          </button>
        </div>
        {!p.available && (
          <p className="error">This item is currently unavailable.</p>
        )}
        <Link to="/cart" className="text-link">
          View your bag <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
function Cart() {
  const { data, update } = useData();
  const subtotal = data.cart.reduce((s, l) => s + l.price * l.qty, 0);
  return (
    <section className="page narrow">
      <h1>Your bag of happiness.</h1>
      {!data.cart.length ? (
        <div className="empty">
          <ShoppingBag />
          <h2>Room for something lovely.</h2>
          <Link className="button" to="/menu">
            Explore the menu
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {data.cart.map((l, i) => (
              <div key={i} className="cart-line">
                <div>
                  <Link to={`/product/${l.productId}`}>{l.name}</Link>
                  <small>
                    {l.variant} {l.message && `Message: ${l.message}`}
                  </small>
                </div>
                <Quantity
                  value={l.qty}
                  set={(qty) =>
                    update((d) => ({
                      ...d,
                      cart: d.cart.map((x, j) => (i === j ? { ...x, qty } : x)),
                    }))
                  }
                />
                <strong>{money(l.price * l.qty)}</strong>
                <button
                  className="icon-button"
                  aria-label={`Remove ${l.name}`}
                  onClick={() =>
                    update((d) => ({
                      ...d,
                      cart: d.cart.filter((_, j) => i !== j),
                    }))
                  }
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </div>
          <p className="muted">
            Delivery fees and discounts are calculated at checkout.
          </p>
          <div className="actions">
            <Link className="button" to="/checkout">
              Continue to checkout <ArrowRight size={18} />
            </Link>
            <Link to="/menu">Keep exploring</Link>
          </div>
        </>
      )}
    </section>
  );
}
function Checkout() {
  const { data, update } = useData(),
    navigate = useNavigate();
  const [form, setForm] = useState({
      customer: "",
      phone: "",
      email: "",
      address: "",
      mode: "pickup",
      when: "",
      notes: "",
      code: "",
    }),
    [error, setError] = useState("");
  const lock = useRef(false);
  const t = totals(data.cart, data.settings, form.mode, form.code);
  const field =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm({ ...form, [k]: e.target.value });
  function submit(e: React.FormEvent, state: string) {
    e.preventDefault();
    if (lock.current) return;
    let err = fulfillmentError(form.when, data.cart, data);
    if (!data.cart.length) err = "Your bag is empty.";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      err = "Enter a valid 10-digit Indian mobile number.";
    if (!form.customer.trim()) err = "Enter your name.";
    if (form.mode === "delivery" && !form.address.trim())
      err = "Enter your delivery address.";
    if (
      (form.mode === "pickup" && !data.settings.pickup) ||
      (form.mode === "delivery" && !data.settings.delivery)
    )
      err = "This fulfillment method is currently unavailable.";
    for (const l of data.cart) {
      const p = data.products.find((p) => p.id === l.productId);
      if (
        !p ||
        p.archived ||
        !p.available ||
        p.price === null ||
        p.price !== l.price
      )
        err = `${l.name} changed or is unavailable. Remove it from your bag and add it again.`;
    }
    if (err) {
      setError(err);
      return;
    }
    lock.current = true;
    const id = uid("CUBS");
    const order: Order = {
      id,
      ...form,
      ...t,
      when: new Date(form.when + "+05:30").toISOString(),
      items: data.cart.map((l) => ({ ...l })),
      payment: state === "successful" ? "paid" : "failed",
      status: "placed",
      created: new Date().toISOString(),
    };
    update((d) => ({
      ...d,
      orders: [order, ...d.orders],
      payments: [
        {
          id: uid("PAY"),
          orderId: id,
          amount: t.total,
          state,
          date: new Date().toISOString(),
        },
        ...d.payments,
      ],
      history: [id, ...d.history],
      cart: [],
    }));
    navigate(`/orders/${id}`);
  }
  if (!data.cart.length)
    return (
      <section className="page">
        <h1>Your bag is empty.</h1>
        <Link to="/menu">Browse the menu</Link>
      </section>
    );
  return (
    <section className="page checkout">
      <div>
        <h1>
          A few details.
          <br />
          Then, something delicious.
        </h1>
        <p>Guest checkout · no account needed</p>
        <form onSubmit={(e) => submit(e, "successful")}>
          <h3>Your details</h3>
          <label>
            Name
            <input
              required
              value={form.customer}
              onChange={field("customer")}
              autoComplete="name"
            />
          </label>
          <div className="form-grid">
            <label>
              Mobile number
              <input
                required
                type="tel"
                value={form.phone}
                onChange={field("phone")}
                autoComplete="tel"
                maxLength={10}
              />
            </label>
            <label>
              Email (optional)
              <input
                type="email"
                value={form.email}
                onChange={field("email")}
                autoComplete="email"
              />
            </label>
          </div>
          <h3>Make it yours</h3>
          <label>
            Fulfillment
            <select value={form.mode} onChange={field("mode")}>
              <option value="pickup" disabled={!data.settings.pickup}>
                Pick up at Cubs
              </option>
              <option value="delivery" disabled={!data.settings.delivery}>
                Delivery
              </option>
            </select>
          </label>
          {form.mode === "delivery" && (
            <>
              <label>
                Delivery address
                <textarea
                  required
                  value={form.address}
                  onChange={field("address")}
                />
              </label>
              <p className="notice">{data.settings.coverage}</p>
            </>
          )}
          <label>
            Fulfillment date & time (India time)
            <input
              type="datetime-local"
              required
              min={localTime()}
              value={form.when}
              onChange={field("when")}
            />
          </label>
          <p className="muted">
            Demo opening hours: {data.settings.open}–{data.settings.close}.
            Cakes need {data.settings.lead} hours notice.
          </p>
          <label>
            Order notes (optional)
            <textarea value={form.notes} onChange={field("notes")} />
          </label>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <div className="notice">
            Simulated payment only. No real card details or money required.
          </div>
          <div className="actions">
            <button type="submit">Pay {money(t.total)} · demo success</button>
            <button
              type="button"
              className="secondary"
              onClick={(e) => {
                const f = e.currentTarget.closest("form");
                if (f?.reportValidity()) submit(e, "failed");
              }}
            >
              Simulate failed payment
            </button>
          </div>
        </form>
      </div>
      <aside className="order-summary">
        <h2>Freshly picked by you.</h2>
        {data.cart.map((l, i) => (
          <div key={i} className="summary-row">
            <span>
              {l.qty} × {l.name}
              <small>{l.message}</small>
            </span>
            <strong>{money(l.qty * l.price)}</strong>
          </div>
        ))}
        <label>
          Discount code
          <input
            value={form.code}
            onChange={field("code")}
            placeholder="Enter a code"
          />
        </label>
        {form.code && (
          <small className={t.discount ? "success" : "error"}>
            {t.discount ? "Discount applied" : "Code not recognised"}
          </small>
        )}
        <PriceSummary t={t} />
        <Link to="/cart">Edit your bag</Link>
      </aside>
    </section>
  );
}
function History() {
  const { data } = useData();
  return (
    <section className="page narrow">
      <h1>Your happy moments.</h1>
      <p>Orders placed in this browser are saved here.</p>
      {data.history.map((id) => {
        const o = data.orders.find((o) => o.id === id);
        return (
          o && (
            <Link className="history-row" key={id} to={`/orders/${id}`}>
              <span>
                {id}
                <small>{dateDisplay(o.created)}</small>
              </span>
              <span>
                {money(o.total)} · {o.status}
                <ChevronRight size={16} />
              </span>
            </Link>
          )
        );
      })}
      {!data.history.length && (
        <p>
          No orders yet. <Link to="/menu">Find your first favourite.</Link>
        </p>
      )}
    </section>
  );
}
function Tracking() {
  const { id } = useParams();
  const { data, update, notify } = useData();
  const busy = useRef(false);
  const o = data.orders.find((o) => o.id === id);
  if (!o)
    return (
      <section className="page">
        Order not found. <Link to="/orders">Your orders</Link>
      </section>
    );
  function retry() {
    if (busy.current || !o || o.payment === "paid") return;
    busy.current = true;
    const invalid = o.items.some((l) => {
      const p = data.products.find((p) => p.id === l.productId);
      return !p || !p.available || p.archived || p.price !== l.price;
    });
    const err = fulfillmentError(
      new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Kolkata",
        dateStyle: "short",
        timeStyle: "short",
      })
        .format(new Date(o.when))
        .replace(" ", "T"),
      o.items,
      data,
    );
    if (invalid || err || o.status === "cancelled") {
      notify(
        invalid
          ? "Items changed or are unavailable. Please contact Cubs to update this order."
          : err || "This order was cancelled.",
      );
      busy.current = false;
      return;
    }
    update((d) => ({
      ...d,
      orders: d.orders.map((x) =>
        x.id === id ? { ...x, payment: "paid" } : x,
      ),
      payments: [
        {
          id: uid("PAY"),
          orderId: o.id,
          amount: o.total,
          state: "successful",
          date: new Date().toISOString(),
        },
        ...d.payments,
      ],
    }));
    notify("Simulated payment successful. The same order was paid.");
  }
  return (
    <section className="page narrow">
      <div className="confirmation-icon">
        <Check />
      </div>
      <h1>
        {o.payment === "paid"
          ? "A little happiness is on its way."
          : o.payment === "refunded"
            ? "Your payment was refunded."
            : "Your order is saved."}
      </h1>
      <p>
        Order {o.id} · <Badge text={o.status} />
      </p>
      <div className="notice">
        Payment: <strong>{o.payment}</strong> · All payments are simulated.
        {o.payment === "failed" && (
          <button onClick={retry}>Retry payment · demo success</button>
        )}
      </div>
      <h3>
        {o.customer} · {o.phone}
      </h3>
      <p>
        {o.mode === "pickup" ? "Pickup at Cubs" : `Deliver to ${o.address}`}
        <br />
        {dateDisplay(o.when)} (India time)
      </p>
      {o.items.map((l, i) => (
        <div className="summary-row" key={i}>
          <span>
            {l.qty} × {l.name}
            <small>
              {l.variant} {l.message}
            </small>
          </span>
          <strong>{money(l.price * l.qty)}</strong>
        </div>
      ))}
      <PriceSummary t={o} />
      {o.notes && <p>Notes: {o.notes}</p>}
      <div className="tracking-steps">
        {[
          "placed",
          "confirmed",
          "preparing",
          o.mode === "delivery" ? "out for delivery" : "ready",
          "completed",
        ].map((s) => (
          <span className={s === o.status ? "current" : ""} key={s}>
            {s}
          </span>
        ))}
      </div>
      <Link to="/orders">All your orders</Link>
    </section>
  );
}
function Reservations() {
  const { data, update, notify } = useData();
  const [form, setForm] = useState({
      name: "",
      phone: "",
      date: "",
      time: "",
      party: 2,
      notes: "",
    }),
    [error, setError] = useState("");
  const lock = useRef(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (lock.current) return;
    const err = fulfillmentError(`${form.date}T${form.time}`, [], data);
    if (err) {
      setError(err);
      return;
    }
    const minutes = (t: string) =>
      Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
    if (
      (minutes(form.time) - minutes(data.settings.open)) %
        data.settings.slotMinutes !==
        0 ||
      minutes(form.time) + data.settings.slotMinutes >
        minutes(data.settings.close)
    ) {
      setError(
        `Choose a ${data.settings.slotMinutes}-minute slot starting from ${data.settings.open} and ending before ${data.settings.close}.`,
      );
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (
      form.party +
        capacityUsed(
          data.reservations,
          form.date,
          form.time,
          data.settings.slotMinutes,
        ) >
      data.settings.capacity
    ) {
      setError("This slot has insufficient capacity. Try another time.");
      return;
    }
    lock.current = true;
    const id = uid("TABLE");
    update((d) => ({
      ...d,
      reservations: [{ ...form, id, status: "pending" }, ...d.reservations],
      reservationHistory: [id, ...d.reservationHistory],
    }));
    notify(`Reservation ${id} requested. Awaiting bakery confirmation.`);
    setError("");
    setForm({ ...form, notes: "" });
    setTimeout(() => {
      lock.current = false;
    }, 500);
  }
  return (
    <section className="page reservation-page">
      <div>
        <h1>
          Make room for
          <br />
          <em>good company.</em>
        </h1>
        <p>
          A catch-up, a celebration, or just because.
          <br />
          There’s a table waiting at Cubs.
        </p>
        <Img src={photos.coffee} alt="Illustrative café drink" />
        <small>Illustrative photography</small>
      </div>
      <div>
        <form onSubmit={submit}>
          <h2>Save yourself a spot.</h2>
          <p>Reservations are requests until confirmed by the bakery.</p>
          <label>
            Your name
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Mobile number
            <input
              type="tel"
              required
              maxLength={10}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>
          <div className="form-grid">
            <label>
              Date
              <input
                type="date"
                required
                min={localDate()}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </label>
            <label>
              Time (India)
              <input
                type="time"
                required
                step={data.settings.slotMinutes * 60}
                min={data.settings.open}
                max={data.settings.close}
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </label>
          </div>
          <label>
            Guests
            <input
              type="number"
              min={1}
              max={data.settings.capacity}
              required
              value={form.party}
              onChange={(e) =>
                setForm({ ...form, party: Number(e.target.value) })
              }
            />
          </label>
          <label>
            Anything we should know? (optional)
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </label>
          <small>
            Demo: {data.settings.slotMinutes}-minute slots ·{" "}
            {data.settings.capacity} guests capacity · {data.settings.open}–
            {data.settings.close}.
          </small>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button type="submit">
            Request a table <ArrowRight size={17} />
          </button>
        </form>
        <h3>Your reservations</h3>
        {data.reservations
          .filter((r) => data.reservationHistory.includes(r.id))
          .map((r) => (
            <div className="history-row" key={r.id}>
              <div>
                {r.id}
                <small>
                  {r.date} · {r.time} · {r.party} guests
                </small>
              </div>
              <Badge text={r.status} />
            </div>
          ))}
      </div>
    </section>
  );
}
function Contact() {
  const { data } = useData(),
    s = data.settings;
  return (
    <section className="page contact">
      <div>
        <h1>
          Come for a treat.
          <br />
          Stay for a while.
        </h1>
        <p>Find your way to Cubs in Gokulam, Mysuru.</p>
        <h3>
          <MapPin size={20} /> Our little corner
        </h3>
        <p>{s.address}</p>
        <h3>
          <Phone size={20} /> Give us a ring
        </h3>
        <a href={`tel:${s.phone.replaceAll(" ", "")}`}>{s.phone}</a>
        <h3>
          <Clock size={20} /> Make time for Cubs
        </h3>
        <p>
          Closing time: 11:30 pm, as supplied.
          <br />
          Opening time is awaiting owner confirmation.
        </p>
        <a
          className="button"
          target="_blank"
          rel="noreferrer"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
        >
          Get directions <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="contact-art">
        <Img src={photos.bread} alt="Illustrative bakery bread" />
        <img
          className="brand-reference"
          src="/cubs-logo.png"
          alt="Cubs Bakery & Cakes paw logo"
        />
        <small>Cubs Bakery & Cakes · bakery photo is illustrative</small>
      </div>
    </section>
  );
}
