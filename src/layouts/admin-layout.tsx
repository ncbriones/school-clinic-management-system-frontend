import Sidebar from "@/features/admin/admin-sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100 font-inter">
      <aside className="w-64 h-full shrink-0">
        <Sidebar />
      </aside>

      <main className="flex-1 h-full overflow-y-auto p-6 bg-secondary">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
