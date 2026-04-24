import { useEffect, useState } from "react";
import NewForm from "./components/NewForm";
import { useAuth } from "./store/useAuthStore";
import { useSocket } from "./hooks/useSocket";
import HeroSection from "./components/HeroSection";

export default function App() {
  const { auth } = useAuth();
  useSocket(auth ?? null);

  const [isPop, setIsPop] = useState<boolean>(false);

  useEffect(() => {
    const isSubmitted = localStorage.getItem("leadSubmitted");
    if (!isSubmitted) {
      const timeoutId = setTimeout(() => setIsPop(true), 2000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const isLeadSubmitted = localStorage.getItem("leadSubmitted");
      if (!isLeadSubmitted) setIsPop(true);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSuccess = () => {
    setTimeout(() => setIsPop(false), 2000);
  };

  return (
    <>
      <HeroSection setIsPop={setIsPop} />
      {isPop && <NewForm onSuccess={handleFormSuccess} setIsPop={setIsPop} />}
    </>
  );
}
