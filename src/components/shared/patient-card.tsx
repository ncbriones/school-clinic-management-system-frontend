import type { Patient } from "@/types/patient";

type PatientCardProps = {
  patient: Patient;
  onStartConsultation: () => void;
};

const PatientCard = ({ patient, onStartConsultation }: PatientCardProps) => {
  const capitalizeText = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const consultationCount = patient.consultations
    ? patient.consultations.length
    : 0;

  return (
    <div className="bg-primary border border-primary/80 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-200">
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <h2 className="text-xl font-bold text-white font-inter tracking-wide capitalize">
            {capitalizeText(patient.firstName)}{" "}
            {capitalizeText(patient.lastName)}
          </h2>
        </div>

        <div className="space-y-3 mb-6">
          <div>
            <p className="text-sm text-white font-semibold tracking-wider mb-0.5">
              ID Number
            </p>
            <p className="text-sm font-semibold text-slate-300/80 font-inter tracking-wider">
              {patient.idNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-white font-semibold tracking-wider mb-0.5">
              Gender
            </p>
            <p className="text-sm font-semibold text-slate-300/80 font-inter tracking-wider">
              {capitalizeText(patient.gender)}
            </p>
          </div>

          <div>
            <p className="text-sm text-white font-semibold tracking-wider mb-0.5">
              Total Consultations
            </p>
            <p className="text-sm font-semibold text-slate-300/80 font-inter tracking-wider">
              {consultationCount}{" "}
              {consultationCount === 0
                ? ""
                : consultationCount === 1
                  ? "consultation"
                  : "consultations"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-3 mt-auto">
        <button
          onClick={onStartConsultation}
          className="text-sm bg-green-900 font-semibold text-white px-4 py-2.5 rounded-xl hover:bg-green-700 transition-colors shadow-sm font-inter tracking-wide"
        >
          + Create Consultation
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
