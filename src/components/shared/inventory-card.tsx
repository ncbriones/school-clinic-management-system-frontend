import type { Medicine } from "@/types/medicine";

type InventoryCardProps = {
  inventory: Medicine;
};

const InventoryCard = ({ inventory }: InventoryCardProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isLowStock = inventory.stockQuantity <= inventory.stockAlert;

  const isExpired = new Date(inventory.expiresAt) < new Date();

  return (
    <div className="bg-primary text-white p-5 rounded-2xl border border-primary/80 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
      <div>
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="font-bold text-xl font-inter tracking-wide capitalize">
            {inventory.genericName}
          </h3>
          <div className="flex gap-1.5 shrink-0">
            {isExpired ? (
              <span className="bg-red-600 text-white text-xs py-2 px-3 rounded-md font-semibold font-inter uppercase">
                Expired
              </span>
            ) : isLowStock ? (
              <span className="bg-amber-500 text-slate-900 text-xs py-2 px-3 rounded-md font-semibold font-inter uppercase">
                Low Stock
              </span>
            ) : (
              <span className="bg-green-900 text-white text-xs py-2 px-3 rounded-md font-semibold font-inter uppercase">
                Valid
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-base font-inter text-slate-100">
            Inventory Status:
          </p>
          <p
            className={`text-sm tracking-tight mt-0.5 ${isLowStock ? "text-amber-400" : "text-white"}`}
          >
            {inventory.stockQuantity}{" "}
            <span className="text-sm text-slate-200">units available</span>
          </p>
        </div>

        {inventory.treatedIllnesses &&
          inventory.treatedIllnesses.length > 0 && (
            <div className="mt-2 mb-4">
              <p className="text-sm text-slate-100 mb-1.5 tracking-wider">
                Treated Conditions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {inventory.treatedIllnesses.map((illness) => (
                  <span
                    key={illness.id}
                    className="bg-white/10 text-slate-200 border border-white/1 text-xs px-2.5 py-0.5 rounded-full font-inter"
                  >
                    {illness.name}
                  </span>
                ))}
              </div>
            </div>
          )}
      </div>

      <div className="border-t border-white/10 pt-3 mt-auto flex flex-col sm:flex-row justify-between text-xs text-slate-300 font-inter gap-1">
        <div>
          <span className="font-semibold text-white">Added Date:</span>{" "}
          {formatDate(inventory.addedAt)}
        </div>
        <div>
          <span className="font-semibold text-white">Expiry Date:</span>{" "}
          <span
            className={isExpired ? "text-red-400 font-bold" : "text-slate-300"}
          >
            {formatDate(inventory.expiresAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
