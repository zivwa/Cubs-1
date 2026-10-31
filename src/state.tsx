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
export const initial = load();
export const Ctx = createContext<{
  data: Data;
  update: (fn: (d: Data) => Data) => void;
  notify: (s: string) => void;
}>({ data: initial.data, update: () => {}, notify: () => {} });
export const useData = () => useContext(Ctx);
