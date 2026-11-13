import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import Dashboard from "./pages/nurse/dashboard";
import Patients from "./pages/nurse/patients";
import Inventory from "./pages/nurse/inventory";
import Records from "./pages/nurse/records";
import Login from "./pages/login";
import { authLoader } from "./auth-loader";
import AdminLayout from "./layouts/admin-layout";
import AdminDashboard from "./pages/admin/dashboard";
import Nurses from "./pages/admin/nurses";
import AdminRecords from "./pages/admin/records";
import AdminInventory from "./pages/admin/inventory";
import Protocol from "./pages/nurse/protocol";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    loader: authLoader(["ADMIN"]),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "nurses",
        element: <Nurses />,
      },
      {
        path: "records",
        element: <AdminRecords />,
      },
      {
        path: "inventory",
        element: <AdminInventory />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: authLoader(["NURSE"]),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "patients",
        element: <Patients />,
      },
      {
        path: "records",
        element: <Records />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "protocol",
        element: <Protocol />,
      },
    ],
  },
]);
