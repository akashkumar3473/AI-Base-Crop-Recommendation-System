
import axios from "axios";
import { Circles } from "react-loader-spinner";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";
import Swal from "sweetalert2";

const cropImages = {
  rice:
    "https://images.unsplash.com/photo-1536053296406-53f39f4e8d8f",
  cotton:
    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
  maize:
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076",
  mango:
    "https://images.unsplash.com/photo-1553279768-865429fa0078",
};

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    Crop_Type: "kharif",
    N: "",
    P: "",
    K: "",
    pH: "",
    rainfall: "",
    temperature: "",
    Area_in_hectares: 1,
  });

  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [topPredictions, setTopPredictions] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch weather data
  const fetchWeather = async () => {
    if (!city.trim()) {
      Swal.fire({
        title: "Enter City",
        text: "Please enter a city name first.",
        icon: "warning",
      });
      return;
    }

    try {
      const API_KEY = "c094171e91113455b4e96e052fafa4e8";

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const weatherData = response.data;

      setFormData((prev) => ({
        ...prev,
        temperature: weatherData.main.temp,
      }));

      Swal.fire({
        title: "Weather Fetched 🌤️",
        text: `Temperature loaded for ${city}`,
        icon: "success",
      });
    } catch (error) {
      console.error("Weather Error:", error);

      Swal.fire({
        title: "Error",
        text: "City not found or weather service unavailable!",
        icon: "error",
      });
    }
  };

  // Crop prediction
  const handlePredict = async () => {
    try {
      setLoading(true);

      const API_URL = import.meta.env.VITE_API_URL || "";

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Crop_Type: formData.Crop_Type,
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
          pH: Number(formData.pH),
          rainfall: Number(formData.rainfall),
          temperature: Number(formData.temperature),
          Area_in_hectares: Number(formData.Area_in_hectares),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prediction failed");
      }

      setPrediction(data.recommended_crop || "");
      setConfidence(data.confidence || "");

      const cropName = data.recommended_crop?.toLowerCase();

      setCropImage(cropImages[cropName] || "");
      setTopPredictions(data.top_predictions || []);
      setFertilizers(data.fertilizer_recommendation || []);

      Swal.fire({
        title: "Prediction Successful 🌱",
        text: `Recommended Crop: ${data.recommended_crop}`,
        icon: "success",
      });
    } catch (error) {
      console.error("Prediction Error:", error);

      Swal.fire({
        title: "Prediction Error",
        text: error.message || "Something went wrong!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-700 flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/5 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-3xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <FaLeaf className="text-4xl text-white" />

          <h1 className="text-4xl font-bold text-white">
            Crop Recommendation
          </h1>
        </div>

        {/* City / Weather */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-4 rounded-xl outline-none"
          />

          <button
            onClick={fetchWeather}
            className="bg-blue-500 hover:bg-blue-700 text-white px-6 rounded-xl"
          >
            Fetch Weather
          </button>
        </div>

        {/* Input Fields */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* Crop Type */}
          <select
            name="Crop_Type"
            value={formData.Crop_Type}
            onChange={handleChange}
            className="p-4 rounded-xl outline-none"
          >
            <option value="kharif">Kharif</option>
            <option value="rabi">Rabi</option>
            <option value="zaid">Zaid</option>
          </select>

          {/* Nitrogen */}
          <input
            type="number"
            name="N"
            placeholder="Nitrogen"
            value={formData.N}
            onChange={handleChange}
            className="p-4 rounded-xl outline-none"
          />

          {/* Phosphorus */}
          <input
            type="number"
            name="P"
            placeholder="Phosphorus"
            value={formData.P}
            onChange={handleChange}
            className="p-4 rounded-xl outline-none"
          />

          {/* Potassium */}
          <input
            type="number"
            name="K"
            placeholder="Potassium"
            value={formData.K}
            onChange={handleChange}
            className="p-4 rounded-xl outline-none"
          />

          {/* Temperature */}
          <input
            type="number"
            name="temperature"
            placeholder="Temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="p-4 rounded-xl outline-none"
          />

          {/* pH */}
          <input
            type="number"
            step="0.1"
            name="pH"
            placeholder="pH"
            value={formData.pH}
            onChange={handleChange}
            className="p-4 rounded-xl outline-none"
          />

          {/* Rainfall */}
          <input
            type="number"
            name="rainfall"
            placeholder="Rainfall"
            value={formData.rainfall}
            onChange={handleChange}
            className="p-4 rounded-xl outline-none"
          />

          {/* Area */}
          <input
            type="number"
            step="0.1"
            name="Area_in_hectares"
            placeholder="Area in hectares"
            value={formData.Area_in_hectares}
            onChange={handleChange}
            className="p-4 rounded-xl outline-none"
          />
        </div>

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full mt-8 bg-green-600 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition-all duration-300 flex justify-center items-center"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <Circles
                height="30"
                width="30"
                color="#ffffff"
                ariaLabel="loading"
              />

              <span>Predicting...</span>
            </div>
          ) : (
            "Recommend Crop"
          )}
        </button>

        {/* Prediction Result */}
        {prediction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 bg-white rounded-2xl p-6 text-center"
          >
            {/* Recommended Crop */}
            <h2 className="text-3xl font-bold text-green-700">
              {prediction}
            </h2>

            <p className="text-gray-600 mt-2">
              Confidence: {confidence}
            </p>

            {/* Crop Image */}
            {cropImage && (
              <img
                src={cropImage}
                alt={prediction}
                className="mt-5 rounded-2xl w-full h-64 object-cover"
              />
            )}

            {/* Top Predictions */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                Top Suggestions
              </h3>

              <div className="space-y-3">
                {topPredictions.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-green-100 p-4 rounded-xl"
                  >
                    <span className="font-semibold text-lg capitalize">
                      {item.crop}
                    </span>

                    <span className="font-bold text-green-700">
                      {item.probability}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fertilizer Recommendation */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Fertilizer Recommendation
              </h3>

              <div className="space-y-3">
                {fertilizers.map((item, index) => (
                  <div
                    key={index}
                    className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-xl text-left"
                  >
                    🌱 {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CropRecommendation;

