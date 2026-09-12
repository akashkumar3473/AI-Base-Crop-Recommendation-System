
import { useState, useEffect } from "react";
import GlobalStyles from "./components/GlobalStyles";
import Hero from "./components/Hero";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import NotificationPage from "./components/NotificationPage";
import CropRecommendationPage from "./components/CropRecommendation";
import WeatherForecast from "./components/WeatherForecast";
import translations from "./translations";

function App() {
    // State to manage user login
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [city, setCity] = useState("");
    const [authToken, setAuthToken] = useState(null);

    // State to manage the current page
    const [page, setPage] = useState("dashboard");

    // State to manage the current language
    const [language, setLanguage] = useState("en");
    const t = translations[language];

    // --- Rotating background images ---
    const backgroundImages = [
        "https://images.pexels.com/photos/2131899/pexels-photo-2131899.jpeg",
        "https://images.pexels.com/photos/3145153/pexels-photo-3145153.jpeg",
        "https://images.pexels.com/photos/2164437/pexels-photo-2164437.jpeg",
        "https://images.pexels.com/photos/1487549/pexels-photo-1487549.png"
    ];
    const [bgIndex, setBgIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 12000);
        return () => clearInterval(id);
    }, []);

    // --- SENSOR AND OTHER DATA ---
    const [sensorData, setSensorData] = useState({ temperature: 23.5, nitrogen: 80, ph: 5.5, phosphorus: 40, potassium: 40, moisture: 55.2, ec: 0 });
    const [tankLevel, setTankLevel] = useState(70);
    const [sensorHistory, setSensorHistory] = useState([]);
    const [recommendations, setRecommendations] = useState(null);
    const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
    const [notifications, setNotifications] = useState([ { id: 1, title: "Rain Alert", message: "Heavy rain expected in your area.", timestamp: "0.4 ago", read: false }, { id: 2, title: "System Update", message: "Sensors firmware updated successfully.", timestamp: "1 day ago", read: true }, { id: 3, title: "Tank Alert", message: "Rainwater tank has reached the danger threshold.", timestamp: "2 days ago", read: false } ]);
    
    // --- State to hold weather data ---
    const [weather, setWeather] = useState(null);
    
    // --- Check for existing authentication on app load ---
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            try {
                const userData = JSON.parse(user);
                setAuthToken(token);
                setUserName(userData.name);
                setCity(userData.city);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
            }
        }
    }, []);

    const API_URL = import.meta.env.VITE_API_URL || '';

    // --- useEffect to fetch SENSOR data from the Flask backend ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                     const response = await fetch(`${API_URL}/api/dashboard-data`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSensorData(data.latest);
                setSensorHistory(data.history);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    // --- useEffect to fetch weather data when city changes ---
    useEffect(() => {
        const fetchWeather = async (cityName) => {
            const API_KEY = 'fbabf63131a9d7503fc95290422a68ab'; 
            
            if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
                console.warn("Weather API Key is missing. Please add it in App.jsx");
                return;
            }
            
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Weather data not found for the city.');
                }
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error("Failed to fetch weather:", error);
                setWeather(null);
            }
        };

        if (isLoggedIn && city) {
            fetchWeather(city);
        }
    }, [city, isLoggedIn]);

    
    const handleAnalyzeAndRecommend = async () => {
        setPage('recommendation');
        setIsLoadingRecommendation(true);
        setRecommendations(null);
        const now = new Date();
        const month = now.getMonth();
        let season = 'kharif';
        if (month >= 5 && month <= 9) { season = 'kharif'; } else if (month >= 10 || month <= 1) { season = 'rabi'; } else { season = 'summer'; }
        const monthlyAverages = [15, 20, 30, 50, 150, 300, 350, 320, 200, 80, 40, 20];
        let seasonalRainfall = 0;
        if (season === 'kharif') { seasonalRainfall = monthlyAverages[5] + monthlyAverages[6] + monthlyAverages[7] + monthlyAverages[8]; } else if (season === 'rabi') { seasonalRainfall = monthlyAverages[9] + monthlyAverages[10] + monthlyAverages[11] + monthlyAverages[0] + monthlyAverages[1]; } else { seasonalRainfall = monthlyAverages[2] + monthlyAverages[3] + monthlyAverages[4]; }
        const payload = { 'Crop_Type': season, 'N': sensorData.nitrogen, 'P': sensorData.phosphorus, 'K': sensorData.potassium, 'pH': sensorData.ph, 'rainfall': seasonalRainfall, 'temperature': sensorData.temperature, 'Area_in_hectares': 1 };
        try {
            const response = await fetch(`${API_URL}/predict`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), });
            if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error || `Server responded with status: ${response.status}`); }
            const result = await response.json();
            setRecommendations(result);
        } catch (err) { console.error("Error calling prediction API:", err); setRecommendations([{ Crop: "Prediction Failed", Predicted_Yield_t_ha: 0 }]); } finally { setIsLoadingRecommendation(false); }
    };

    const handleLogin = (name, userCity) => {
        setUserName(name);
        setCity(userCity);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setUserName("");
        setCity("");
        setWeather(null);
        setAuthToken(null);
        setIsLoggedIn(false);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    };

    const renderPage = () => {
        switch (page) {
            case "dashboard": return <DashboardPage sensorData={sensorData} tankLevel={tankLevel} sensorHistory={sensorHistory} handleAnalyze={handleAnalyzeAndRecommend} setPage={setPage} t={t} recommendations={recommendations} isLoadingRecommendation={isLoadingRecommendation} />;
            case "notifications": return <NotificationPage notifications={notifications} t={t} onMarkAsRead={(id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))} onMarkAllAsRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))} />;
            case "recommendation": return <CropRecommendationPage setPage={setPage} recommendations={recommendations} isLoading={isLoadingRecommendation} sensorData={sensorData} t={t} />;
            case "weather":
            return <WeatherForecast />;
            default: return null;
        }
    };

    if (!isLoggedIn) {
        return <><GlobalStyles /><LoginPage onLogin={handleLogin} t={t} /></>;
    }

    return (
        <div className="min-h-screen font-sans relative">
            {/* Crossfading background layers to avoid white flash */}
            <div
                key={bgIndex}
                className="bg-layer bg-layer--visible"
                style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
            />
            <div
                key={`next-${bgIndex}`}
                className="bg-layer"
                style={{ backgroundImage: `url(${backgroundImages[(bgIndex + 1) % backgroundImages.length]})` }}
            />
            <div className="bg-overlay" />
            <GlobalStyles />
            <Hero
                setPage={setPage}
                currentPage={page}
                onLogout={handleLogout}
                userName={userName}
                language={language}
                setLanguage={setLanguage}
                title={t.heroTitle}
                subtitle={t.heroSubtitle}
                heroImage="https://images.pexels.com/photos/6871905/pexels-photo-6871905.jpeg"
                weather={weather}
                monthlyRainfall={null}
                t={t}
            />
            <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">{renderPage()}</main>
        </div>
    );
}

export default App;