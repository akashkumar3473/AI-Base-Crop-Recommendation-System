# 🌱 BhoomiSense — AI-Powered Smart Farming Platform

### 🌾 Intelligent Crop Recommendation • AI Farming Assistant • Fertilizer Guidance • Sensor Intelligence

**BhoomiSense** is an AI-powered smart farming platform that combines **Machine Learning, Generative AI, agricultural knowledge, and real-time sensor data** to help farmers make better crop and farming decisions.

The platform analyzes soil nutrients, environmental conditions, crop seasons, and sensor information to provide personalized agricultural recommendations through both an ML prediction system and an intelligent AI chatbot.

🚀 **Live Demo:** https://ai-base-crop-recommendation-system-swart.vercel.app/

---

## ✨ Key Features

### 🌱 1. ML-Based Crop Recommendation

BhoomiSense predicts suitable crops using important soil and environmental parameters:

* Nitrogen (N)
* Phosphorus (P)
* Potassium (K)
* Temperature
* Humidity
* Soil pH
* Rainfall

The system provides crop recommendations based on the trained Machine Learning model.

---

### 🤖 2. AI Farming Chatbot

BhoomiSense includes an intelligent **Hugging Face-powered AI chatbot** that acts as a virtual farming assistant.

The chatbot can understand agricultural questions and provide contextual guidance related to:

* 🌱 Crop selection
* 🌾 Crop cultivation
* 🧪 Soil conditions
* 💊 Fertilizers
* 🌦️ Weather and environmental conditions
* 📊 ML prediction results
* 📡 Sensor readings
* 🗓️ Agricultural seasons
* 🌱 Kharif crops
* 🌾 Rabi crops
* 🌻 Zaid crops

---

### 🧠 3. ML Prediction Awareness

The AI chatbot is designed to work with the crop prediction workflow.

It can use the available prediction context, including:

* Predicted crop
* Top-5 crop predictions
* Soil NPK values
* pH
* Temperature
* Humidity
* Rainfall

This creates a more interactive experience than a traditional crop-prediction application.

---

### 📊 4. Top-5 Crop Predictions

Instead of returning only one prediction, BhoomiSense can provide the **Top-5 predicted crops**, allowing users to compare multiple possible crops.

Example:

```text
1. Rice
2. Maize
3. Cotton
4. Banana
5. Chickpea
```

---

### 📡 5. Live Sensor Data Awareness

BhoomiSense can work with live/connected sensor information to support smart farming applications.

Potential environmental parameters include:

* 🌡️ Temperature
* 💧 Humidity
* 🌱 Soil moisture
* 🧪 Soil parameters
* 🌦️ Environmental conditions

Sensor information can be incorporated into the AI-assisted farming workflow.

---

### 🗓️ 6. Crop Season Intelligence

The platform includes agricultural season information for:

| Season     | Examples                        |
| ---------- | ------------------------------- |
| 🌧️ Kharif | Rice, Maize, Cotton, Soybean    |
| ❄️ Rabi    | Wheat, Chickpea, Mustard, Peas  |
| ☀️ Zaid    | Watermelon, Muskmelon, Cucumber |

This allows the system to provide more context-aware crop recommendations.

---

### 💊 7. Fertilizer Recommendations

BhoomiSense provides fertilizer-related guidance based on crop and soil conditions.

The system can consider:

* Nitrogen
* Phosphorus
* Potassium
* Soil pH
* Selected/predicted crop
* Agricultural context

> ⚠️ Fertilizer recommendations should be treated as informational guidance and validated with local agricultural experts or soil-test results before application.

---

## 🏗️ System Architecture

```text
                    🌱 BhoomiSense
                         │
                         ▼
              ┌─────────────────────┐
              │    User Interface   │
              │   React / Web App   │
              └──────────┬──────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
            ▼                         ▼
   🌱 Crop Prediction          🤖 AI Chatbot
            │                         │
            ▼                         ▼
    Machine Learning          Hugging Face AI
       Prediction                  Model
            │                         │
            └────────────┬────────────┘
                         │
                         ▼
                🧠 Farming Context
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      Soil Data      Sensor Data    Crop Seasons
          │              │              │
          └──────────────┼──────────────┘
                         ▼
               📊 Agricultural
                 Recommendations
                         │
                         ▼
                🌾 Farmer Decision
```

---

## 🔄 Application Workflow

```text
User
 │
 ▼
Enter Soil & Environmental Data
 │
 ├── N
 ├── P
 ├── K
 ├── Temperature
 ├── Humidity
 ├── pH
 └── Rainfall
 │
 ▼
Machine Learning Model
 │
 ▼
Crop Prediction
 │
 ├── Best Crop
 └── Top-5 Predictions
 │
 ▼
AI Farming Assistant
 │
 ├── Crop Guidance
 ├── Fertilizer Guidance
 ├── Season Information
 ├── Sensor Context
 └── Agricultural Q&A
 │
 ▼
🌱 Smart Farming Recommendation
```

---

## 🧠 AI + Machine Learning

BhoomiSense combines two major intelligence layers:

### Machine Learning Layer

The ML model is responsible for numerical crop prediction based on agricultural parameters.

```text
N + P + K
    +
Temperature
    +
Humidity
    +
pH
    +
Rainfall
    ↓
Machine Learning Model
    ↓
Crop Prediction
```

### Generative AI Layer

The AI chatbot provides natural-language interaction and agricultural assistance.

```text
User Question
      ↓
AI Chatbot
      ↓
Agricultural Context
      +
ML Prediction Context
      +
Sensor Context
      ↓
AI-Generated Response
```

---

## 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript / TypeScript
* HTML5
* CSS3
* Responsive Web UI

### Backend

* Python
* FastAPI
* Uvicorn
* REST APIs

### Machine Learning

* Scikit-learn
* Pandas
* NumPy
* Pickle

### AI

* Hugging Face
* AI-powered chatbot
* Context-aware agricultural responses

### Deployment

* GitHub
* Vercel — Frontend
* Render — Backend

---

## 📊 Input Parameters

| Parameter   | Description                |
| ----------- | -------------------------- |
| N           | Nitrogen content in soil   |
| P           | Phosphorus content in soil |
| K           | Potassium content in soil  |
| Temperature | Environmental temperature  |
| Humidity    | Environmental humidity     |
| pH          | Soil acidity/alkalinity    |
| Rainfall    | Expected/recorded rainfall |

---

## 🌾 Supported Intelligence

BhoomiSense combines multiple information sources:

```text
                    BhoomiSense AI
                          │
       ┌──────────────────┼──────────────────┐
       │                  │                  │
       ▼                  ▼                  ▼
   ML Model          Sensor Data       Agriculture DB
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                          ▼
                    AI Assistant
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
         Crop Advice  Fertilizer    Season Info
```

---

## 📁 Project Structure

```text
BhoomiSense/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── backend/
│   ├── app/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── chatbot/
│   ├── requirements.txt
│   └── ...
│
├── model/
│   └── crop_prediction_model.pkl
│
├── .env
├── .gitignore
└── README.md
```

> The exact structure may vary depending on your current repository organization.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd BhoomiSense
```

---

### 2. Backend Setup

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
HF_API_KEY=your_huggingface_api_key
```

Additional environment variables may be required depending on your backend configuration.

> 🔐 Never upload API keys or `.env` files containing secrets to GitHub.

---

### 4. Start the Backend

For FastAPI/Uvicorn:

```bash
uvicorn app:app --reload
```

Or use the startup command defined by your project.

The backend will normally be available at:

```text
http://127.0.0.1:8000
```

---

### 5. Start the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

---

## 🔌 API Workflow

The application follows a frontend → backend → AI/ML architecture.

```text
Frontend
   │
   ├── Crop Prediction Request
   │
   └── Chatbot Request
          │
          ▼
       FastAPI
          │
     ┌────┴─────┐
     ▼          ▼
 ML Prediction  AI Service
     │          │
     └────┬─────┘
          ▼
      JSON Response
          │
          ▼
       Frontend
```

---

## 🚀 Deployment Architecture

BhoomiSense uses a separate frontend and backend deployment architecture.

```text
                    GitHub
                       │
            ┌──────────┴──────────┐
            │                     │
            ▼                     ▼
        Vercel                  Render
       Frontend                 Backend
            │                     │
            └──────────┬──────────┘
                       │
                       ▼
                 🌱 BhoomiSense
```

### Frontend

Deployed using:

**Vercel**

### Backend

Deployed using:

**Render**

### Source Code

Hosted using:

**GitHub**

---

## 🌐 Live Application

🚀 **BhoomiSense Live Demo**

https://ai-base-crop-recommendation-system-swart.vercel.app/

---

## 🔐 Security

API credentials should always be stored using environment variables.

Do **not** commit:

```text
.env
API keys
Access tokens
Secret keys
Private credentials
```

Recommended `.gitignore` entries:

```gitignore
.env
.env.local
.env.production
venv/
__pycache__/
node_modules/
*.pyc
```

---

## 🎯 Future Improvements

BhoomiSense can be extended with:

* 📡 IoT-based real-time soil monitoring
* 🌦️ Weather API integration
* 🛰️ Satellite-based crop monitoring
* 🗺️ GPS-based agricultural recommendations
* 📷 Plant disease detection using Computer Vision
* 📈 Crop yield prediction
* 💰 Market price prediction
* 🧑‍🌾 Regional-language AI assistant
* 📱 Android/mobile application
* 🔔 Smart irrigation alerts
* 🌱 Soil health monitoring
* 📊 Farmer analytics dashboard

---

## 🌟 Vision

The goal of **BhoomiSense** is to combine **Artificial Intelligence, Machine Learning, IoT, and agricultural data** into a single platform that can help farmers make more informed and data-driven decisions.

```text
                    🌱 BhoomiSense

        Sense → Analyze → Predict → Recommend

             🌾 Smarter Farming with AI
```

---

## 👨‍💻 Developer

**Sudhakar Sharma**

B.Tech — Electronics & Communication Engineering
Specialization: Artificial Intelligence & Machine Learning

### Areas of Interest

* Artificial Intelligence
* Machine Learning
* Computer Vision
* IoT
* Embedded Systems
* Smart Agriculture
* Robotics

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📜 License

This project is intended for educational, research, and demonstration purposes.

Add an appropriate open-source license to the repository if you plan to distribute or reuse the project publicly.
