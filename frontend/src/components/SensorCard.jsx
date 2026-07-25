const SensorCard = ({ icon, label, value, unit, lastUpdated, t }) => (
    <div className="bg-white/80 p-6 rounded-2xl border border-gray-200 flex flex-col items-start transition-all duration-300 hover:shadow-xl hover:border-green-400">
        <div className="flex items-center justify-between w-full mb-4">
            <div className="text-lg font-semibold text-gray-500">{label}</div>
            {icon}
        </div>
        <div className="text-4xl font-bold text-gray-800 mb-1">
            {value}
            <span className="text-2xl font-medium text-gray-500">{unit}</span>
        </div>
        <div className="text-sm text-gray-400 mt-auto">~2s {t.ago}</div>
    </div>
);

export default SensorCard;