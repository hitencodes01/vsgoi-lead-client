import { io } from "socket.io-client";

// const socket = io("https://vsgoi-lead-server.onrender.com/", {
//   withCredentials: true,
//   transports: ["websocket", "polling"],
// });

const socket = io("https://vsgoi-lead-server.onrender.com", {
  withCredentials: true,
  transports: ["websocket", "polling"],
  autoConnect: true,
});

export default socket;
