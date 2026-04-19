import { io } from "socket.io-client";

const socket = io("https://vsgoi-lead-server.onrender.com/", {
  withCredentials: true,
});

export default socket;
