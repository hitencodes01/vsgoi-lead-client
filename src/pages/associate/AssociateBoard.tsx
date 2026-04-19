import { useQuery } from "@tanstack/react-query";
import { fetchAllLeads } from "../../api/axios";
import LeadsTable from "../../components/LeadsTable";
import { LeadStore } from "../../store/useLead";
import { useEffect, useRef, useState } from "react";
import { Bell, User2Icon, X, Calendar1Icon } from "lucide-react";
import { useAuth } from "../../store/useAuthStore";
import { useSocket } from "../../hooks/useSocket";
import { useLeadNotification } from "../../hooks/useLeadNotification";
import { useNotificationStore } from "../../store/useNotificationStore";
import { api } from "../../api/axios";
import Loading from "../../components/Loading";

export default function AssociateBoard() {
  useEffect(() => {
    document.title = `VSGOI | Associate`;
  }, []);

  const { auth } = useAuth();
  useSocket(auth ?? null);
  useLeadNotification();

  const { notification } = useLeadNotification();
  const { notifications, markAllRead, unreadCount } = useNotificationStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { setLeads } = LeadStore();
  const { data, isLoading } = useQuery({
    queryKey: ["allLeads"],
    queryFn: fetchAllLeads,
  });

  useEffect(() => {
    if (data?.leads) setLeads(data.leads);
  }, [data, setLeads]);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

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

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-lg px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-extrabold tracking-wide text-white">
          VSGOI <span className="text-blue-400">Lead Associate</span>
        </h1>
        <img
          src="./assets/download.jpg"
          alt="logo"
          className="h-12 w-28 object-cover ring-2 ring-blue-500"
        />
        <div className="flex items-center gap-6">
          {/* Bell */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleBellClick}
              className="relative p-1 cursor-pointer bg-transparent border-none text-white"
            >
              <Bell size={20} />
              {unreadCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount() > 9 ? "9+" : unreadCount()}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <span className="font-semibold text-black text-sm">
                    Notifications
                  </span>
                  <button
                    onClick={() => setDropdownOpen(false)}
                    className="cursor-pointer bg-transparent border-none"
                  >
                    <X size={14} />
                  </button>
                </div>
                <ul className="max-h-72 overflow-y-auto m-0 p-0 list-none">
                  {notifications.length === 0 ? (
                    <li className="px-4 py-6 text-center text-gray-400 text-sm">
                      No notifications
                    </li>
                  ) : (
                    notifications.map((n) => (
                      <li
                        key={n._id}
                        className={`px-4 py-2.5 text-sm border-b border-gray-100 flex gap-2.5 items-start ${!n.isRead ? "bg-blue-50" : "bg-white"}`}
                      >
                        <span
                          className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!n.isRead ? "bg-blue-500" : "bg-gray-300"}`}
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

          <User2Icon size={20} className="cursor-pointer text-white" />
        </div>
      </nav>

      {/* ── Toast ── */}
      {notification && (
        <div className="fixed top-4 right-4 z-999 bg-green-600 text-white px-5 py-3 rounded-xl text-sm shadow-lg">
          🔔 {notification}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* ── PIE CHARTS ── */}
        {/* <section>
          <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <PieChartIcon size={18} /> Lead Breakdown
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Status",
                data: [
                  { id: 0, value: pendingLeads, label: "Pending" },
                  { id: 1, value: resolvedLeads, label: "Resolved" },
                ],
              },
              {
                label: "Outcome",
                data: [
                  { id: 0, value: successLeads, label: "Success" },
                  { id: 1, value: failLeads, label: "Fail" },
                ],
              },
            ].map(({ label, data }) => (
              <div key={label} className="bg-white rounded-2xl p-4 flex flex-col items-center border border-gray-800 shadow">
                <p className="text-xs uppercase tracking-widest text-black mb-2">{label}</p>
                <PieChart series={[{ data }]} width={200} height={180} />
              </div>
            ))}
          </div>
        </section> */}

        {/* ── LINE CHART ── */}
        {/* <section>
          <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <ChartBarBigIcon size={18} /> Leads Per Day
          </h2>
          <div className="bg-white rounded-2xl p-5 border border-gray-800 shadow">
            <Box sx={{ width: "100%", height: 260 }}>
              <LineChart
                series={[{ data: leadsPerDayData.map((d) => d.count), label: "Leads" }]}
                xAxis={[{ scaleType: "point", data: leadsPerDayData.map((d) => d.day), height: 28 }]}
                yAxis={[{ width: 40 }]}
                margin={24}
              />
            </Box>
          </div>
        </section> */}

        {/* ── ALL LEADS TABLE ── */}
        <section>
          <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <Calendar1Icon size={18} /> All Leads
          </h2>
          <div className=" overflow-hidden border border-gray-800 shadow-xl">
            <LeadsTable />
          </div>
        </section>
      </main>
    </div>
  );
}
