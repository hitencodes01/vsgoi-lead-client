import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import AdminDashboard from "./pages/admin/AdminBoard";
import AssociateBoard from "./pages/associate/AssociateBoard";
import ViewAssociates from "./pages/admin/components/ViewAssociates";
import ErpLogin from "./pages/erp/ErpLogin";
import AdminLogin from "./pages/erp/admin/AdminLogin";
import FacultyLogin from "./pages/erp/faculty/FacultyLogin";
import StudentLogin from "./pages/erp/student/StudentLogin";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/erp-login", element: <ErpLogin /> },
  { path: "/erp/admin", element: <AdminLogin /> },
  { path: "/erp/faculty", element: <FacultyLogin /> },
  { path: "/erp/student", element: <StudentLogin /> },
  {
    path: "/admin",
    element: (
      <Protected role="admin">
        <AdminDashboard />
      </Protected>
    ),
  },
  {
    path: "/admin/ViewAssociates/:n",
    element: (
      <Protected role="admin">
        <ViewAssociates />
      </Protected>
    ),
  },
  {
    path: "/associate",
    element: (
      <Protected role="associate">
        <AssociateBoard />
      </Protected>
    ),
  },
]);
export default router;
