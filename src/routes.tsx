import { createBrowserRouter } from "react-router-dom";
// import Home from "./pages/Home";
import About from "./pages/About";
import Inventory from "./pages/Inventory";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "records",
        element: <About />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
    ],
  },
]);
