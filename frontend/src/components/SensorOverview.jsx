import Card from './Card';
import SensorCard from './SensorCard';
import ThermometerIcon from './icons/ThermometerIcon';
import DropletIcon from './icons/DropletIcon';
import MineralIcon from './icons/MineralIcon';
import FlaskIcon from './icons/FlaskIcon';
import TestTubeIcon from './icons/TestTubeIcon';

const SensorOverview = ({ sensorData, t }) => {
    return (
        <Card className="hover:-translate-y-2 hover:shadow-green-200/50">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t.sensorOverview}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <SensorCard
                    icon={<ThermometerIcon />}
                    label={t.temperature}
                    value={sensorData.temperature}
                    unit="°C"
                    t={t}
                />
                <SensorCard
                    icon={<DropletIcon />}
                    label={t.moisture}
                    value={sensorData.moisture}
                    unit="%"
                    t={t}
                />
                <SensorCard
                    icon={<MineralIcon />}
                    label={t.nitrogen}
                    value={sensorData.nitrogen}
                    unit="mg/kg"
                    t={t}
                />
                <SensorCard
                    icon={<MineralIcon />}
                    label={t.phosphorus}
                    value={sensorData.phosphorus}
                    unit="mg/kg"
                    t={t}
                />
                <SensorCard
                    icon={<MineralIcon />}
                    label={t.potassium}
                    value={sensorData.potassium}
                    unit="mg/kg"
                    t={t}
                />
                <SensorCard
                    icon={<FlaskIcon />}
                    label={t.ph}
                    value={sensorData.ph}
                    unit="" // pH is a unitless scale
                    t={t}
                />
                <SensorCard
                    icon={<TestTubeIcon />}
                    label={t.electricalConductivity}
                    // --- THIS IS THE ONLY LINE THAT NEEDS TO BE CHANGED ---
                    value={sensorData.ec} // Changed from electricalConductivity to ec
                    unit="µS/cm"
                    t={t}
                />
            </div>
        </Card>
    );
};

export default SensorOverview;