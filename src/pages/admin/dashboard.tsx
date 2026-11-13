import { api } from "@/api/axios";
import LowStockList from "@/components/low-stock-table";
import LiveClock from "@/components/shared/clock";
import { useAuthContext } from "@/contexts/auth";
import SummaryCard from "@/features/admin/summary-card";
import type { Consultation } from "@/types/consultation";
import type { Medicine } from "@/types/medicine";
import type { Nurse } from "@/types/user";
import { useEffect, useState } from "react";

type Inventory = Medicine;

const AdminDashboard = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [nurses, setNurses] = useState<Nurse[]>([]);

  const { name } = useAuthContext();

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const [consultationsRes, medicinesRes, nursesRes] = await Promise.all([
          api.get<Consultation[]>("/api/consultations"),
          api.get<Medicine[]>("/api/medicines"),
          api.get<Nurse[]>("/api/users", {
            params: {
              role: "NURSE",
            },
          }),
        ]);

        setConsultations(consultationsRes.data);
        setInventories(medicinesRes.data);
        setNurses(nursesRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDashboardData();
  }, []);

  return (
    <div className="p-6 bg-tertiary min-h-screen text-slate-800 rounded-2xl">
      <div className="flex justify-between items-start mb-8 bg-primary p-5 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white pb-3 font-inter">
            Welcome, {name}!
          </h1>
          <p className="text-md text-white font-inter">
            An overview of the school clinic.
          </p>
        </div>
        <LiveClock />
      </div>

      <div className="bg-primary border border-primary/60 rounded-2xl p-6 text-left text-slate-400 text-sm w-full">
        <h1 className="font-bold text-xl text-white mb-4">Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          <SummaryCard title={"Consultations"} count={consultations?.length} />
          <SummaryCard title={"Inventories"} count={inventories.length} />
          <SummaryCard title={"Nurses"} count={nurses.length} />
        </div>
        <div className="max-w-6xl mt-4">
          <LowStockList inventories={inventories} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
