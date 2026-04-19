import { io } from "socket.io-client";

const socket = io("https://vsgoi-lead-server.onrender.com/", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

export default socket;
