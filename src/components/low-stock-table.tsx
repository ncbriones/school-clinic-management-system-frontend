import type { Medicine } from "@/types/medicine";

type LowStockTableProps = {
  inventories: Medicine[];
};

const LowStockTable = ({ inventories }: LowStockTableProps) => {
  const lowStockItems = inventories.filter(
    (item) => item.stockQuantity <= item.reorderLevel,
  );

  return (
    <div className="bg-primary border border-white/60 rounded-2xl p-6 text-left w-full shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-xl text-white font-inter">
            Low Stock Alert Monitoring
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Medicines that fall below their reorder levels are shown here.
          </p>
        </div>
        {lowStockItems.length > 0 && (
          <span className="p-2 text-white text-sm font-semibold rounded-xl border">
            Low Stock Item Count: {lowStockItems.length}
          </span>
        )}
      </div>

      {lowStockItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-200">
          <h3 className="text-white font-semibold text-base font-inter">
            Sufficient Stocks
          </h3>
          <p className="text-sm text-slate-400 max-w-sm mt-1">
            All medicines in the inventory are fully stocked and safely above
            their required reorder levels.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead>
              <tr className="border-b border-slate-300 text-white text-sm tracking-wider">
                <th className="pb-3 pt-2 font-medium">Generic Name</th>
                <th className="pb-3 pt-2 font-medium">Status</th>
                <th className="pb-3 pt-2 font-medium text-right">
                  Stock Quantity
                </th>
                <th className="pb-3 pt-2 font-medium text-right">
                  Reorder Level
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {lowStockItems.map((item) => {
                const isOutOfStock = item.stockQuantity === 0;

                return (
                  <tr key={item.id} className="text-sm">
                    <td className="text-sm">{item.genericName}</td>
                    <td className="py-3.5">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-medium  text-red-400 border">
                          Out of Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-medium  text-amber-400 border ">
                          Low Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-right text-white">
                      {item.stockQuantity}
                    </td>
                    <td className="py-3.5 text-right text-white">
                      {item.reorderLevel}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LowStockTable;
