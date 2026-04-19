import { useQuery } from "@tanstack/react-query";
import { api, leadStats } from "../../api/axios";
import { PieChart, LineChart } from "@mui/x-charts";
import Box from "@mui/material/Box";
import type { Stats } from "../../types";
import ExportExcel from "./components/ExportExcel";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import TodayLeadGrid from "./components/TodayLeadGrid";
import { useAuth } from "../../store/useAuthStore";
import { useSocket } from "../../hooks/useSocket";
import {
  Bell,
  Calendar1Icon,
  ChartBarBigIcon,
  PersonStanding,
  PieChartIcon,
  X,
} from "lucide-react";
import { useLeadNotification } from "../../hooks/useLeadNotification";
import { useEffect, useRef, useState } from "react";
import { useNotificationStore } from "../../store/useNotificationStore";

export default function AdminBoard() {
  useEffect(() => {
    document.title = `VSGOI | Admin`;
  }, []);

  const { auth } = useAuth();
  useSocket(auth ? auth : null);
  useLeadNotification();

  const { notification } = useLeadNotification();
  const { notifications, markAllRead, unreadCount } = useNotificationStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const navigate = useNavigate();
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["leadStats"],
    queryFn: leadStats,
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleBellClick = async () => {
    const opening = !dropdownOpen;
    setDropdownOpen(opening);
    if (opening && unreadCount() > 0) {
      try {
        await api.patch("/notifications/read");
        markAllRead();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <div>Something went wrong... {error.message}</div>;

  const stats: Stats = data.data;
  console.log(stats);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-lg px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-extrabold tracking-wide text-white">
          VSGOI <span className="text-blue-400">Lead Admin</span>
        </h1>
        <img
          src="./assets/download.jpg"
          alt="logo"
          className="h-12 w-28  object-cover ring-2 ring-blue-500"
        />
        <div className="flex flex-row justify-center items-center gap-10">
          <div className="relative" ref={dropdownRef}>
            {/* Bell Button */}
            <button
              onClick={handleBellClick}
              className="relative p-1 cursor-pointer bg-transparent border-none"
            >
              <Bell size={20} />

              {unreadCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount() > 9 ? "9+" : unreadCount()}
                </span>
              )}
            </button>
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <span className="font-semibold text-black text-sm">
                    Notifications
                  </span>
                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* List */}
                <ul className="max-h-72 overflow-y-auto m-0 p-0 list-none">
                  {notifications.length === 0 ? (
                    <li className="px-4 py-6 text-center text-gray-400 text-sm">
                      No notifications
                    </li>
                  ) : (
                    notifications.map((n) => (
                      <li
                        key={n._id}
                        className={`px-4 py-2.5 text-sm border-b border-gray-100 flex gap-2.5 items-start ${
                          !n.isRead ? "bg-blue-50" : "bg-white"
                        }`}
                      >
                        <span
                          className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                            !n.isRead ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        />

                        <div>
                          <p className="text-gray-900 m-0">{n.message}</p>
                          <p className="text-gray-400 text-[11px] mt-0.5">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
          <ExportExcel />
        </div>
      </nav>

      {/* ── Toast ── */}
      {notification && (
        <div className="fixed top-4 right-4 z-999 bg-green-600 text-white px-5 py-3 rounded-xl text-sm shadow-lg">
          🔔 {notification}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* ── STAT BANNER ── */}
        <div className="bg-gradient-to from-blue-600 to-blue-800 rounded-2xl p-5 flex items-center justify-between shadow-xl">
          <div>
            <p className="text-sm uppercase tracking-widest text-blue-200">
              Total Leads
            </p>
            <p className="text-5xl font-black">{stats.totalLeads}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200 mb-1">📅 Today</p>
            <p className="text-3xl font-bold">{stats.totalTodayLeads}</p>
            <p className="text-xs text-blue-300 mt-1">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* ── PIE CHARTS GRID ── */}
        <section>
          <h2 className="text-lg font-semibold text-gray-300 mb-4">
            <PieChartIcon /> Lead Breakdown
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Status",
                data: [
                  { id: 0, value: stats.totalPendingLeads, label: "Pending" },
                  { id: 1, value: stats.totalResolvedLeads, label: "Resolved" },
                ],
              },
              {
                label: "Outcome",
                data: [
                  { id: 0, value: stats.totalLeadSuccess, label: "Success" },
                  { id: 1, value: stats.totalLeadFail, label: "Fail" },
                ],
              },
              {
                label: "By Course",
                data: stats?.leadsByCourse?.map((item, i) => ({
                  id: i,
                  value: item.count,
                  label: item._id,
                })),
              },
              {
                label: "By Source",
                data: stats?.leadsBySource?.map((item, i) => ({
                  id: i,
                  value: item.count,
                  label: item._id,
                })),
              },
            ].map(({ label, data }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-4 flex flex-col items-center border border-gray-800 shadow"
              >
                <p className="text-xs uppercase tracking-widest text-black mb-2">
                  {label}
                </p>
                <PieChart series={[{ data }]} width={160} height={160} />
              </div>
            ))}
          </div>
        </section>

        {/* ── LINE CHART + ASSOCIATES ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="lg:col-span-2  bg-white rounded-2xl p-5 border border-gray-800 shadow">
            <h2 className="text-lg font-semibold text-black mb-3">
              <ChartBarBigIcon /> Leads Per Day
            </h2>
            <Box sx={{ width: "100%", height: 260 }}>
              <LineChart
                series={[
                  {
                    data: stats.leadsPerDay.map((item) => item.count),
                    label: "Leads",
                  },
                ]}
                xAxis={[
                  {
                    scaleType: "point",
                    data: stats.leadsPerDay.map((item) =>
                      item._id.slice(8, 10),
                    ),
                    height: 28,
                  },
                ]}
                yAxis={[{ width: 40 }]}
                margin={24}
              />
            </Box>
          </div>

          {/* Associates */}
          <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 shadow flex flex-col justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-300">
              <PersonStanding /> Associates
            </h2>
            {[1, 2].map((n) => (
              <div
                key={n}
                className="bg-amber-500 rounded-xl p-4 flex items-center justify-between shadow"
              >
                <div>
                  <p className="font-bold text-gray-900 text-base">
                    Associate {n}
                  </p>
                  <p className="text-xs text-gray-800">Tap to view profile</p>
                </div>
                <button
                  className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
                  onClick={() => navigate(`/admin/ViewAssociates/${n}`)}
                >
                  View →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── TODAY'S LEADS TABLE ── */}
        <section>
          <h2 className="text-lg font-semibold text-gray-300 mb-4">
            <Calendar1Icon /> Today's Leads
          </h2>
          <div
            className="rounded-2xl overflow-hidden border border-gray-800 shadow-xl"
            style={{ height: 350 }}
          >
            <TodayLeadGrid />
          </div>
        </section>
      </main>
    </div>
  );
}
