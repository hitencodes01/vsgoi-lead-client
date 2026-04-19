import { create } from "zustand";

export interface Notification {
  _id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAllRead: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],

  setNotifications: (notifications) => set({ notifications }),

  // ✅ Prepends new real-time notification to the top of stack
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  // ✅ Clears unread flag locally (after API call)
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),

  unreadCount: () => get().notifications.filter((n) => !n.isRead).length,
}));