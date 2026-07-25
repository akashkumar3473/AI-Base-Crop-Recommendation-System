import Card from './Card';

const RainwaterTank = ({ level, t }) => {
    const displayLevel = Math.min(100, Math.max(0, level));
    return (
        <Card className="flex flex-col hover:-translate-y-2 hover:shadow-blue-200/50">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t.rainwaterTank}</h3>
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-32 h-64 bg-gray-200 rounded-lg border-4 border-gray-300 overflow-hidden relative">
                    <div 
                        className="absolute bottom-0 w-full bg-blue-400 transition-all duration-1000 ease-in-out" 
                        style={{ height: `${displayLevel}%` }}
                    >
                         <div 
                            className="water-animation" 
                            style={{ 
                                backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 256s128-64 256-64 256 64 256 64v256H0z' fill='rgba(34,147,243,0.5)'/%3e%3c/svg%3e")`,
                                backgroundSize: '100% 15px'
                            }}
                        />
                         <div 
                            className="water-animation" 
                            style={{ 
                                backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 256s128-64 256-64 256 64 256 64v256H0z' fill='rgba(34,147,243,0.8)'/%3e%3c/svg%3e")`,
                                backgroundSize: '100% 15px',
                                animationDelay: '1.5s',
                                animationDuration: '4s'
                            }}
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white drop-shadow-md">{displayLevel.toFixed(0)}%</span>
                    </div>
                </div>
                <div className="text-center mt-4"><p className="font-semibold text-gray-600">{t.capacity}</p><p className="text-lg font-bold text-gray-800">1000L</p></div>
            </div>
        </Card>
    );
};

export default RainwaterTank;