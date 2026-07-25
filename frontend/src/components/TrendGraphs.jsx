import React, { useState, useEffect } from 'react';
import Card from './Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrendGraphs = ({ sensorData, t }) => {
    const [trendData, setTrendData] = useState([]);
    const [timeRange, setTimeRange] = useState('24h');

    // Generate trend data based on time range
    const generateTrendData = () => {
        const now = new Date();
        const data = [];
        const hours = timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
        const interval = timeRange === '24h' ? 60 * 60 * 1000 : timeRange === '7d' ? 60 * 60 * 1000 : 2 * 60 * 60 * 1000;
        
        for (let i = hours; i >= 0; i--) {
            const time = new Date(now.getTime() - i * interval);
            const timeLabel = timeRange === '24h' 
                ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                : timeRange === '7d'
                ? time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            // Generate realistic temperature and humidity data with inverse relationship
            const hourOfDay = time.getHours();
            const baseTemp = 20 + Math.sin((hourOfDay - 6) * Math.PI / 12) * 8; // Peak at 2 PM
            const baseHumidity = 80 - Math.sin((hourOfDay - 6) * Math.PI / 12) * 35; // Inverse of temp
            
            data.push({
                time: timeLabel,
                temperature: Math.round((baseTemp + (Math.random() - 0.5) * 4) * 10) / 10,
                humidity: Math.round((baseHumidity + (Math.random() - 0.5) * 10) * 10) / 10,
                moisture: Math.round((baseHumidity + (Math.random() - 0.5) * 15) * 10) / 10
            });
        }
        return data;
    };

    useEffect(() => {
        setTrendData(generateTrendData());
    }, [timeRange]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-medium text-gray-800">{`Time: ${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm">
                            {`${entry.name}: ${entry.value}${entry.dataKey === 'temperature' ? '°C' : '%'}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature Trend Graph */}
            <Card className="hover:-translate-y-2 hover:shadow-green-200/50">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Temperature Trend</h3>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                    </select>
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="time" 
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis 
                                domain={[0, 35]}
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickCount={5}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line 
                                type="monotone" 
                                dataKey="temperature" 
                                stroke="#f97316" 
                                strokeWidth={3}
                                dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
                                name="Temperature (°C)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span>Current: {trendData[trendData.length - 1]?.temperature || 'N/A'}°C</span>
                    </div>
                    <div className="text-right">
                        <div>Min: {Math.min(...trendData.map(d => d.temperature)).toFixed(1)}°C</div>
                        <div>Max: {Math.max(...trendData.map(d => d.temperature)).toFixed(1)}°C</div>
                    </div>
                </div>
            </Card>

            {/* Humidity Trend Graph */}
            <Card className="hover:-translate-y-2 hover:shadow-green-200/50">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Humidity Trend</h3>
                    <div className="text-sm text-gray-500">
                        {timeRange === '24h' ? '24 Hours' : timeRange === '7d' ? '7 Days' : '30 Days'}
                    </div>
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="time" 
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis 
                                domain={[0, 100]}
                                stroke="#6b7280"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickCount={5}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line 
                                type="monotone" 
                                dataKey="humidity" 
                                stroke="#3b82f6" 
                                strokeWidth={3}
                                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                                name="Humidity (%)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Current: {trendData[trendData.length - 1]?.humidity || 'N/A'}%</span>
                    </div>
                    <div className="text-right">
                        <div>Min: {Math.min(...trendData.map(d => d.humidity)).toFixed(1)}%</div>
                        <div>Max: {Math.max(...trendData.map(d => d.humidity)).toFixed(1)}%</div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TrendGraphs;
