import { useEffect, useState } from "react";
import socket from "../socket";
import { api } from "../api/axios";
import { useNotificationStore } from "../store/useNotificationStore";
import type { Notification as NotifType } from "../store/useNotificationStore";

export const useLeadNotification = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const { setNotifications, addNotification } = useNotificationStore();

  //  fetch unread from DB on mount
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await api.get("/notifications");
        setNotifications(res.data.notifications);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };
    fetchUnread();
  }, []);

  useEffect(() => {
    const handler = (data: any) => {
      //browser notification
      if (Notification.permission === "granted") {
        new Notification("New Lead", {
          body: `${data.name} - ${data.interestedCourse}`,
          icon: "/download.jpg",
        });
      }

      //  toast state
      setNotification(`New lead from ${data.name} - ${data.interestedCourse}`);
      setTimeout(() => setNotification(null), 5000);

      // ADD — push to zustand stack
      const newNotif: NotifType = {
        _id: Date.now().toString(),
        userId: "",
        message: `New lead from ${data.name} - ${data.interestedCourse}`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      addNotification(newNotif);
    };

    socket.on("new-lead", handler);

    return () => {
      socket.off("new-lead", handler);
    };
  }, []);

  return { notification };
};
