import { api } from "@/api/axios";
import ConsultationCard from "@/components/shared/consultation-card";
import type { Consultation } from "@/types/consultation";
import { useEffect, useState } from "react";

const AdminRecords = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await api.get<Consultation[]>("/api/consultations");

        setConsultations(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchConsultations();
  }, []);

  return (
    <div className="p-6 bg-tertiary min-h-screen text-slate-800 rounded-2xl">
      <div className="flex justify-between items-center mb-8 bg-primary p-5 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white pb-3 font-inter">
            Clinic Consultation Records
          </h1>
          <p className="text-md text-white font-inter">
            View and monitor all patient medical visits and clinic
            consultations.
          </p>
        </div>
      </div>

      {consultations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl">
          {consultations.map((consultation) => (
            <ConsultationCard
              key={consultation.id}
              consultation={consultation}
            />
          ))}
        </div>
      ) : (
        <div className="bg-primary border border-primary/60 rounded-2xl p-12 text-center text-slate-300 text-sm w-full">
          No school clinic consultation records found as of this moment.
        </div>
      )}
    </div>
  );
};

export default AdminRecords;
