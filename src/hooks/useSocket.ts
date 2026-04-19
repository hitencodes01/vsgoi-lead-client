import { useEffect } from "react";
import socket from "../socket";
import type { Auth } from "../store/useAuthStore";

export const useSocket = (user: Auth | null) => {
  useEffect(() => {
    if (!user) return;
    socket.connect();
    socket.emit("join", user._id);
    console.log(`🟢 Socket connected [${user._id}]`);
    return () => {
      socket.disconnect();
      console.log("🔴 Socket disconnected");
    };
  }, [user]);

  return socket;
};
