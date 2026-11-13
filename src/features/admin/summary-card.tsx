type SummaryCardProps = {
  title: string;
  count: number;
};

const SummaryCard = ({ title, count }: SummaryCardProps) => {
  return (
    <div className="bg-green-900 text-white rounded-xl p-4">
      <h1 className="text-lg font-bold mb-4">Total {title}:</h1>
      <h2 className="text-2xl font-semibold">{count}</h2>
    </div>
  );
};

export default SummaryCard;
