import React from 'react';
import SensorOverview from './SensorOverview';
import RainwaterTank from './RainwaterTank';
import DetailedSensorChart from './DetailedSensorChart';
import TrendGraphs from './TrendGraphs';
import CropRecommendationCard from './CropRecommendationCard'; // Naya component import karein
import CropRecommendationPage from './CropRecommendation';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';

const DashboardPage = ({ sensorData, tankLevel, sensorHistory, handleAnalyze, setPage, t, recommendations, isLoadingRecommendation }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side of the dashboard */}
        <div className="lg:col-span-2 space-y-10">
            <div className="animate-fadeIn" style={{ animationDelay: '100ms'}}>
                <SensorOverview sensorData={sensorData} t={t} />
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: '300ms'}}>
                <TrendGraphs sensorData={sensorData} t={t} />
            </div>
            {/* Recommendation card moved to bottom (full-width) */}
        </div>

        {/* Right side of the dashboard */}
        <div className="lg:col-span-1 space-y-8">
            <div className="animate-fadeIn" style={{ animationDelay: '200ms'}}>
                <RainwaterTank level={tankLevel} t={t}/>
            </div>

            <div className="animate-fadeIn" style={{ animationDelay: '500ms'}}>
                <QuickActions setPage={setPage} t={t}/>
            </div>
            
            <div className="animate-fadeIn" style={{ animationDelay: '700ms'}}>
                <RecentActivity t={t}/>
            </div>
        </div>

        {/* Full-width Detailed Sensor Charts Row */}
        <div className="lg:col-span-3 animate-fadeIn" style={{ animationDelay: '400ms'}}>
            <DetailedSensorChart data={sensorHistory} t={t} />
        </div>

        {/* Full-width Crop Recommendation Card at the very bottom */}
        <div className="lg:col-span-3 animate-fadeIn" style={{ animationDelay: '500ms'}}>
            <CropRecommendationCard handleAnalyze={handleAnalyze} t={t}/>
        </div>
    </div>
);

export default DashboardPage;
