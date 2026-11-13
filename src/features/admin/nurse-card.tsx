import type { Nurse } from "@/types/user";

type NurseCardProps = {
  nurse: Nurse;
  handleInitialDelete: (nurse: Nurse) => void;
};

const NurseCard = ({ nurse, handleInitialDelete }: NurseCardProps) => {
  const initials = nurse.name
    ? nurse.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "NU";

  return (
    <div className="bg-primary border border-primary/80 rounded-2xl p-6 shadow-md transition-all duration-200 flex flex-col justify-between hover:shadow-lg">
      <div>
        <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/1 flex items-center justify-center font-bold font-inter text-slate-200 text-sm tracking-wider">
              {initials}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-inter tracking-wide capitalize">
                {nurse.name}
              </h2>
              <p className="text-xs text-slate-100 font-inter font-medium break-all mt-0.5">
                {nurse.email}
              </p>
            </div>
          </div>

          <span className="bg-green-900 text-white  text-xs uppercase tracking-wider font-bold p-2 rounded-md font-inter">
            {nurse.role || "Nurse"}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-xs text-white font-inter uppercase font-semibold tracking-wider mb-3">
            System Privileges:
          </p>
          <p className="text-sm text-slate-300 font-inter leading-relaxed">
            Authorized school clinic nurse staff with permission to manage
            inventory, log patients, and add treatment protocols.
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-2 mt-2">
        <button
          onClick={() => handleInitialDelete(nurse)}
          className="text-xs bg-red-800 hover:bg-[#d3111e] mt-3  font-bold px-4 py-2.5 rounded-lg text-white hover:border-transparent transition-all shadow-sm tracking-wide"
        >
          Remove Nurse
        </button>
      </div>
    </div>
  );
};

export default NurseCard;
