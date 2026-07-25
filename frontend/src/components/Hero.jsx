import React, { useState, useRef, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay'; // Naya component import karein

const Hero = ({ setPage, currentPage, onLogout, userName, language, setLanguage, title, subtitle, heroImage, weather, t }) => {
    const [openSettings, setOpenSettings] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const onClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenSettings(false);
            }
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);
    // Nav links
    const navLinks = [
        { name: t.dashboard, page: 'dashboard' },
        { name: t.notifications, page: 'notifications' },
        { name: t.cropRecommendation, page: 'recommendation' }
    ];

    return (
        <header className="relative bg-cover bg-center text-white p-6 md:p-8 rounded-b-3xl shadow-2xl overflow-hidden mb-8" style={{backgroundImage: `url(${heroImage})`}}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            
            <div className="relative z-10">
                {/* Top Bar: Weather, User Info, Logout */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        {/* Weather */}
                        <div className="hidden sm:block">
                             <WeatherDisplay weather={weather} t={t} />
                        </div>
                    </div>
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setOpenSettings((v) => !v)}
                            aria-label="Settings"
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.86 1.567l-.152.836a8.286 8.286 0 00-1.487.861l-.78-.45a1.875 1.875 0 00-2.513.682l-.75 1.299a1.875 1.875 0 00.436 2.385l.665.542a8.448 8.448 0 000 1.723l-.665.542a1.875 1.875 0 00-.436 2.385l.75 1.299a1.875 1.875 0 002.513.682l.78-.45c.47.339.97.629 1.487.861l.152.836c.161.904.943 1.567 1.86 1.567h1.5c.917 0 1.699-.663 1.86-1.567l.152-.836c.518-.232 1.017-.522 1.487-.861l.78.45a1.875 1.875 0 002.513-.682l.75-1.299a1.875 1.875 0 00-.436-2.385l-.665-.542c.04-.57.04-1.153 0-1.723l.665-.542a1.875 1.875 0 00.436-2.385l-.75-1.299a1.875 1.875 0 00-2.513-.682l-.78.45a8.286 8.286 0 00-1.487-.861l-.152-.836A1.875 1.875 0 0012.578 2.25h-1.5zm.75 8.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {openSettings && (
                            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-xl ring-1 ring-black/10 overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <div className="text-xs text-gray-500 mb-1">{t.welcome}</div>
                                    <div className="font-semibold truncate max-w-[12rem]">{userName}</div>
                                </div>
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <label className="block text-xs text-gray-500 mb-1">Language</label>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                                    >
                                        <option value="en">English</option>
                                        <option value="hi">हिन्दी</option>
                                    </select>
                                </div>
                                <button
                                    onClick={onLogout}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-red-600 font-medium"
                                >
                                    {t.logout}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Hero Content */}
                <div className="text-center py-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>{title}</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>{subtitle}</p>
                </div>
                
                {/* Navigation Tabs */}
                <nav className="flex justify-center space-x-2 md:space-x-4 bg-black/30 backdrop-blur-sm p-2 rounded-xl max-w-md mx-auto">
                    {navLinks.map(link => (
                        <button 
                            key={link.page} 
                            onClick={() => setPage(link.page)}
                            className={`px-4 py-2 text-sm md:text-base font-semibold rounded-lg transition-all duration-300 w-full ${currentPage === link.page ? 'bg-white text-green-700 shadow-md' : 'text-white hover:bg-white/20'}`}
                        >
                            {link.name}
                        </button>
                        
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Hero;
