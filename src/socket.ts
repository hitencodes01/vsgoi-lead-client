import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const socket = io(BACKEND_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  autoConnect: true,
});

export default socket;