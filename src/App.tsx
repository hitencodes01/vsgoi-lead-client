import { useEffect } from "react";
import NewForm from "./components/NewForm";
import { useAuth } from "./store/useAuthStore";
import { useSocket } from "./hooks/useSocket";
import HeroSection from "./pages/home/HeroSection";
import { useLeadUI } from "./store/useLeadUI";

export default function App() {
  useEffect(() => {
    document.title = "VSGOI";
  }, []);
  const { auth } = useAuth();
  useSocket(auth ?? null);

  const isOpen = useLeadUI((s) => s.isOpen);
  const open = useLeadUI((s) => s.open);

  useEffect(() => {
    const isSubmitted = localStorage.getItem("leadSubmitted");
    if (isSubmitted) return;
    const timeoutId = setTimeout(() => open(), 2000);
    return () => clearTimeout(timeoutId);
  }, [open]);

  useEffect(() => {
    const isLeadSubmitted = localStorage.getItem("leadSubmitted");
    if (isLeadSubmitted) return;

    const interval = setInterval(() => {
      open();
    }, 30000);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <>
      <HeroSection />
      {isOpen && <NewForm />}
    </>
  );
}
