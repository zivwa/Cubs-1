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
import { photos, type Product } from "./menu";
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
} from "./data";
import { Ctx, initial } from "./state";
import { Store } from "./features/storefront";
import { Admin } from "./features/admin";
import "./style.css";
function App() {
  const [data, setData] = useState(initial.data),
    [toast, setToast] = useState(initial.warning);
  const notify = (s: string) => setToast(s);
  const current = useRef(data);
  current.current = data;
  const update = (fn: (d: Data) => Data) => {
    const next = fn(current.current);
    current.current = next;
    try {
      localStorage.setItem("cubs-v1", JSON.stringify(next));
    } catch {
      setToast(
        "Browser storage is full or unavailable. Changes are in memory only. Remove large product images or enable storage.",
      );
    }
    setData(next);
  };
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 7000);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === "cubs-v1") setData(load().data);
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);
  return (
    <Ctx.Provider value={{ data, update, notify }}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Store />} />
        </Routes>
      </BrowserRouter>
      {toast && (
        <div role="status" className="toast">
          {toast}
          <button onClick={() => setToast("")} aria-label="Dismiss">
            <X size={16} />
          </button>
        </div>
      )}
    </Ctx.Provider>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
