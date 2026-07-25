import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const WeatherForecast = ({ compact }) => {

  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchForecast = async () => {

    try {

      setLoading(true);

      const API_KEY = "c094171e91113455b4e96e052fafa4e8";

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = response.data.list;

      const dailyForecast = data.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyForecast);

      setLoading(false);

      Swal.fire({
        title: "Forecast Loaded 🌤️",
        text: `Weather forecast for ${city}`,
        icon: "success",
      });

    } catch (error) {

      console.log(error);

      setLoading(false);

      Swal.fire({
        title: "Error",
        text: "Unable to fetch forecast!",
        icon: "error",
      });
    }
  };

  const containerClass = compact ? "p-0" : "min-h-screen bg-gradient-to-br from-blue-400 to-indigo-700 p-8";
  const cardClass = compact ? "bg-white shadow-xl rounded-3xl p-6" : "max-w-6xl mx-auto bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl";
  const headingClass = compact ? "text-2xl text-slate-900 font-bold text-center mb-6" : "text-4xl text-white font-bold text-center mb-8";

  return (
    <div className={containerClass}>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className={cardClass}
      >

        <h1 className={headingClass}>
          Weather Forecast
        </h1>

        <div className="flex gap-4 mb-8">

          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-4 rounded-xl outline-none"
          />

          <button
            onClick={fetchForecast}
            className="bg-blue-600 hover:bg-blue-800 text-white px-8 rounded-xl"
          >
            Get Forecast
          </button>

        </div>

        {loading && (
          <div className={`text-center ${compact ? 'text-slate-900' : 'text-white'} text-2xl`}>
            Loading Forecast...
          </div>
        )}

        <div className="grid md:grid-cols-5 gap-6">

          {forecast.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-5 text-center shadow-lg"
            >

              <h2 className="text-xl font-bold mb-3">
                {item.dt_txt.split(" ")[0]}
              </h2>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="weather"
                className="mx-auto"
              />

              <p className="text-2xl font-bold text-blue-700">
                {item.main.temp}°C
              </p>

              <p className="capitalize text-gray-600">
                {item.weather[0].description}
              </p>

              <div className="mt-4 text-sm text-gray-700 space-y-1">

                <p>💧 Humidity: {item.main.humidity}%</p>

                <p>🌬 Wind: {item.wind.speed} m/s</p>

              </div>

            </motion.div>

          ))}

        </div>

      </motion.div>

    </div>
  );
};

export default WeatherForecast;