import { io } from "socket.io-client";

const socket = io("https://huggingface.co/spaces/hitencodes01/vsgoi-lead-server", {
  withCredentials: true,
});

export default socket;
