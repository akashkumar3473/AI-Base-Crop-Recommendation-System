import React from 'react';

// Helper function to capitalize the first letter of each word
const capitalizeWords = (str) => {
    if (!str) return '';
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const WeatherDisplay = ({ weather, t }) => {
    if (!weather) {
        return null; // Agar weather data na ho to kuch na dikhayein
    }

    const { name, main, weather: weatherDetails } = weather;
    const iconCode = weatherDetails[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <div className="bg-white/30 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center space-x-3 text-white">
            <img src={iconUrl} alt="weather icon" className="w-12 h-12 -my-2 -ml-1" />
            <div className="text-left">
                <p className="font-bold text-lg leading-tight">
                    {Math.round(main.temp)}°C, {name}
                </p>
                <p className="text-xs font-light leading-tight">
                    {capitalizeWords(weatherDetails[0].description)}
                </p>
            </div>
        </div>
    );
};

export default WeatherDisplay;
