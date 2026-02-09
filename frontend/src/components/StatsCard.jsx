const StatsCard = ({ title, value, icon: Icon, color, subtext }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}
        >
          <Icon size={24} />
        </div>
      </div>

      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>

      {subtext && <p className="text-sm text-gray-500 mt-2">{subtext}</p>}
    </div>
  );
};

export default StatsCard;
