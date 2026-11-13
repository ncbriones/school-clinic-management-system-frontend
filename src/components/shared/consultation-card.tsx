import type { Consultation } from "@/types/consultation";

type ConsultationCardProps = {
  consultation: Consultation;
};

const ConsultationCard = ({ consultation }: ConsultationCardProps) => {
  // Helper to ensure first letter is capitalized for names and categories
  const capitalizeText = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  // Format date strings cleanly (e.g., Nov 9, 2026)
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Safely structure full student name
  const patientName = consultation.patient
    ? `${capitalizeText(consultation.patient.firstName)} ${capitalizeText(consultation.patient.lastName)}`
    : "Unknown Student";

  return (
    <div className="bg-primary border border-primary/80 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 text-white font-inter">
      <div className="mb-4 border-b border-white/10 pb-3">
        <h2 className="text-xl font-bold tracking-wide capitalize">
          {patientName}
        </h2>
        <p className="text-xs text-white tracking-wider font-semibold mt-0.5">
          ID Number: {consultation.patient?.idNumber || "N/A"}
        </p>
      </div>

      <div className="space-y-3.5">
        <div>
          <p className="text-sm text-white font-semibold tracking-wider mb-0.5">
            Diagnosis:
          </p>
          <p className="text-sm font-semibold text-white capitalize">
            {consultation.illness?.name || "No diagnosis logged"}
          </p>
        </div>

        <div>
          <p className="text-sm text-white font-semibold tracking-wider mb-0.5">
            Reason of Visit:
          </p>
          <p className="text-sm text-slate-200 break-words">
            {consultation.reasonOfVisit}
          </p>
        </div>

        <div>
          <p className="text-sm text-white font-semibold tracking-wider mb-0.5">
            Medicine Given:
          </p>
          {consultation.medicineGiven ? (
            <p className="text-sm font-semibold text-white capitalize">
              {consultation.medicineGiven.genericName}{" "}
              <span className="text-sm font-normal ml-1">
                ({"Qty. "}
                {consultation.medicineQuantityGiven})
              </span>
            </p>
          ) : (
            <p className="text-sm italic text-slate-400">None dispensed</p>
          )}
        </div>

        {/* Row 4: Visit Date at the Bottom */}
        <div>
          <p className="text-sm text-white font-semibold tracking-wider mb-0.5">
            Visit Date:
          </p>
          <p className="text-sm text-white">
            {formatDate(consultation.visitedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsultationCard;
