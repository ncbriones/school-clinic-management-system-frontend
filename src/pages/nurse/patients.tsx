import { api } from "@/api/axios";
import Modal from "@/components/shared/modal";
import PatientCard from "@/components/shared/patient-card";
import AddPatientForm from "@/features/nurse/add-patient-form";
import AddConsultationForm from "@/features/nurse/add-consultation-form";
import type { Patient } from "@/types/patient";
import { useEffect, useState } from "react";

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] =
    useState<boolean>(false);

  const [selectedPatientForConsult, setSelectedPatientForConsult] =
    useState<Patient | null>(null);

  const fetchPatients = async () => {
    try {
      const response = await api.get<Patient[]>("/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePatientSubmit = () => {
    fetchPatients();
    setIsAddPatientModalOpen(false);
  };

  const handleConsultationSubmit = () => {
    fetchPatients();
    setSelectedPatientForConsult(null);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="p-6 bg-tertiary min-h-screen text-slate-800 rounded-2xl">
      {/* Top Banner Control Panel Frame */}
      <div className="flex justify-between items-center mb-8 bg-primary p-5 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white pb-3 font-inter">
            Manage Patients
          </h1>
          <p className="text-md text-white font-inter">
            Monitor and add patients who visit school clinic.
          </p>
        </div>
        <button
          onClick={() => setIsAddPatientModalOpen(true)}
          className="bg-green-900 hover:bg-green-700 text-white font-medium text-md px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          + Add Patient
        </button>
        <Modal
          title="Add New Patient"
          isOpen={isAddPatientModalOpen}
          onClose={() => setIsAddPatientModalOpen(false)}
        >
          <AddPatientForm
            onClose={() => setIsAddPatientModalOpen(false)}
            onSuccess={handlePatientSubmit}
          />
        </Modal>
      </div>

      {/* Patients Data Grid Registry */}
      {patients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl">
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onStartConsultation={() => setSelectedPatientForConsult(patient)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-primary border border-primary/60 rounded-2xl p-12 text-center text-slate-300 text-sm w-full">
          There are currently no student patient records available as of this
          moment.
        </div>
      )}

      {/* Dynamic Modal Container for Consultations */}
      <Modal
        title={`New Consultation: ${selectedPatientForConsult ? `${selectedPatientForConsult.firstName} ${selectedPatientForConsult.lastName}` : ""}`}
        isOpen={selectedPatientForConsult !== null}
        onClose={() => setSelectedPatientForConsult(null)}
      >
        {selectedPatientForConsult && (
          <AddConsultationForm
            patientId={selectedPatientForConsult.id}
            onClose={() => setSelectedPatientForConsult(null)}
            onSuccess={handleConsultationSubmit}
          />
        )}
      </Modal>
    </div>
  );
};

export default Patients;
