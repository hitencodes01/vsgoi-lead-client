import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useAuthStore";

export default function Protected({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: string;
}) {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  if (role && auth.role !== role) {
    return <Navigate to={`/${auth.role}`} replace />;
  }

  return <>{children}</>;
}
