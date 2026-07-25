import React from 'react';
import Card from './Card'; // Card component import karein

const CropRecommendationCard = ({ handleAnalyze, t }) => (
    <Card className="hover:-translate-y-2 hover:shadow-green-200/50">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.cropRecommendation}</h3>
        <p className="text-gray-600 mb-6">{t.cropRecommendationSubtitle}</p>
        <button 
            onClick={handleAnalyze} 
            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 active:scale-95 active:shadow-inner flex items-center justify-center"
        >
             {t.getRecommendation}
        </button>
    </Card>
);

export default CropRecommendationCard;
