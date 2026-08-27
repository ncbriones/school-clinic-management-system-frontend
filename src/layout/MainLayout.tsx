import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main className="bg-blue-700 w-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
