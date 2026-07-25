// DetailedSensorChart.jsx

import React, { useState, useEffect } from 'react';
import Card from './Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

const DetailedSensorChart = ({ data, t }) => {
    const [chartType, setChartType] = useState('line');
    const [timeRange, setTimeRange] = useState('24h');
    const [selectedSensors, setSelectedSensors] = useState(['temperature', 'moisture', 'ph']);
    const [filteredData, setFilteredData] = useState([]);

    // Generate mock data if no data provided
    const generateMockData = () => {
        const now = new Date();
        const mockData = [];
        const hours = timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
        
        for (let i = hours; i >= 0; i--) {
            const time = new Date(now.getTime() - i * (timeRange === '24h' ? 60 * 60 * 1000 : timeRange === '7d' ? 60 * 60 * 1000 : 2 * 60 * 60 * 1000));
            mockData.push({
                time: timeRange === '24h' ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 
                      timeRange === '7d' ? time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) :
                      time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                temperature: 20 + Math.sin(i * 0.1) * 10 + Math.random() * 5,
                moisture: 50 + Math.sin(i * 0.05) * 20 + Math.random() * 10,
                nitrogen: 80 + Math.sin(i * 0.08) * 30 + Math.random() * 15,
                ph: 6.5 + Math.sin(i * 0.03) * 1.5 + Math.random() * 0.5,
                phosphorus: 40 + Math.sin(i * 0.06) * 20 + Math.random() * 10,
                potassium: 40 + Math.sin(i * 0.07) * 25 + Math.random() * 12,
                ec: 0.5 + Math.sin(i * 0.04) * 0.3 + Math.random() * 0.2
            });
        }
        return mockData;
    };

    useEffect(() => {
        const dataToUse = data && data.length > 0 ? data : generateMockData();
        setFilteredData(dataToUse);
    }, [data, timeRange]);

    const sensorOptions = [
        { key: 'temperature', label: 'Temperature', color: '#ef4444' },
        { key: 'moisture', label: 'Moisture', color: '#22c55e' },
        { key: 'nitrogen', label: 'Nitrogen', color: '#3b82f6' },
        { key: 'ph', label: 'pH', color: '#f97316' },
        { key: 'phosphorus', label: 'Phosphorus', color: '#8b5cf6' },
        { key: 'potassium', label: 'Potassium', color: '#ec4899' },
        { key: 'ec', label: 'EC', color: '#10b981' }
    ];

    

    const renderCombinedChart = () => {
        const chartData = filteredData.map(item => {
            const filteredItem = { time: item.time };
            selectedSensors.forEach(sensor => {
                filteredItem[sensor] = item[sensor];
            });
            return filteredItem;
        });

        const commonProps = {
            data: chartData,
            margin: { top: 5, right: 30, left: 20, bottom: 5 }
        };

        switch (chartType) {
            case 'line':
                return (
                    <LineChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {selectedSensors.map(sensor => {
                            const option = sensorOptions.find(opt => opt.key === sensor);
                            return (
                                <Line
                                    key={sensor}
                                    type="monotone"
                                    dataKey={sensor}
                                    stroke={option?.color || '#000'}
                                    strokeWidth={2}
                                    name={option?.label || sensor}
                                />
                            );
                        })}
                    </LineChart>
                );
            case 'bar':
                return (
                    <BarChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {selectedSensors.map(sensor => {
                            const option = sensorOptions.find(opt => opt.key === sensor);
                            return (
                                <Bar
                                    key={sensor}
                                    dataKey={sensor}
                                    fill={option?.color || '#000'}
                                    name={option?.label || sensor}
                                />
                            );
                        })}
                    </BarChart>
                );
            case 'area':
                return (
                    <AreaChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {selectedSensors.map(sensor => {
                            const option = sensorOptions.find(opt => opt.key === sensor);
                            return (
                                <Area
                                    key={sensor}
                                    type="monotone"
                                    dataKey={sensor}
                                    stroke={option?.color || '#000'}
                                    fill={option?.color || '#000'}
                                    fillOpacity={0.6}
                                    name={option?.label || sensor}
                                />
                            );
                        })}
                    </AreaChart>
                );
            default:
                return null;
        }
    };

    const renderChartForSensor = (sensorKey) => {
        const chartData = filteredData.map(item => ({
            time: item.time,
            [sensorKey]: item[sensorKey]
        }));

        const option = sensorOptions.find(opt => opt.key === sensorKey);

        const commonProps = {
            data: chartData,
            margin: { top: 5, right: 30, left: 20, bottom: 5 }
        };

        switch (chartType) {
            case 'line':
                return (
                    <LineChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey={sensorKey}
                            stroke={option?.color || '#000'}
                            strokeWidth={2}
                            name={option?.label || sensorKey}
                        />
                    </LineChart>
                );
            case 'bar':
                return (
                    <BarChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey={sensorKey}
                            fill={option?.color || '#000'}
                            name={option?.label || sensorKey}
                        />
                    </BarChart>
                );
            case 'area':
                return (
                    <AreaChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey={sensorKey}
                            stroke={option?.color || '#000'}
                            fill={option?.color || '#000'}
                            fillOpacity={0.6}
                            name={option?.label || sensorKey}
                        />
                    </AreaChart>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Card className="hover:-translate-y-2 hover:shadow-green-200/50 mb-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                    <h3 className="text-2xl font-bold text-gray-800">{t.detailedSensorData}</h3>
                    <div className="flex flex-wrap gap-2">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            {['line', 'bar', 'area'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setChartType(type)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                        chartType === type 
                                            ? 'bg-green-600 text-white' 
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
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
                </div>

                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Select Sensors to Display:</h4>
                    <div className="flex flex-wrap gap-2">
                        {sensorOptions.map(option => (
                            <button
                                key={option.key}
                                onClick={() => setSelectedSensors(prev => prev.includes(option.key) ? prev.filter(s => s !== option.key) : [...prev, option.key])}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                    selectedSensors.includes(option.key)
                                        ? 'bg-green-100 text-green-800 border border-green-300'
                                        : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        {renderCombinedChart()}
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
                {sensorOptions.map(option => {
                    const latestValue = filteredData[filteredData.length - 1]?.[option.key];
                    const avgValue = filteredData.length > 0
                        ? filteredData.reduce((sum, item) => sum + (item[option.key] || 0), 0) / filteredData.length
                        : null;

                    return (
                        <Card key={option.key} className="hover:-translate-y-2 hover:shadow-green-200/50 w-full">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: option.color }}></div>
                                    <h4 className="text-lg font-semibold text-gray-800">{option.label}</h4>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">Latest</div>
                                    <div className="text-base font-bold text-gray-900">{latestValue ? latestValue.toFixed(1) : 'N/A'}</div>
                                    <div className="text-xs text-gray-500">Avg: {avgValue ? avgValue.toFixed(1) : 'N/A'}</div>
                                </div>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    {renderChartForSensor(option.key)}
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </>
    );
};

export default DetailedSensorChart;