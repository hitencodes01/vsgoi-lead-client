import { useLeadNotification } from "../hooks/useLeadNotification";

export default function LeadNotificationBanner() {
  const { notification } = useLeadNotification();

  if (!notification) return null;

  return (
    <div className="fixed top-5 right-5 z-50 bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce">
      🔔 {notification}
    </div>
  );
}
