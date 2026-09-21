import os
import requests
from dotenv import load_dotenv

try:
    from .crop_seasons import crop_seasons
except ImportError:
    from crop_seasons import crop_seasons

load_dotenv()

HF_TOKEN = os.getenv("HUGGINGFACE_API_KEY")

API_URL = "https://router.huggingface.co/v1/chat/completions"
MODEL = "meta-llama/Llama-3.1-8B-Instruct"


def ask_crop_chatbot(
    user_message: str,
    sensor_data=None,
    prediction_data=None
) -> str:

    if not HF_TOKEN:
        return "Hugging Face API key is not configured."

    sensor_data = sensor_data or {}
    prediction_data = prediction_data or {}

    # ---------------------------------------------------------
    # ML PREDICTION DATA
    # ---------------------------------------------------------

    recommended_crop = prediction_data.get("recommended_crop")
    confidence = prediction_data.get("confidence")

    top_predictions = prediction_data.get(
        "top_predictions",
        []
    )

    fertilizer_recommendation = prediction_data.get(
        "fertilizer_recommendation",
        []
    )

    input_data = prediction_data.get(
        "input_data",
        {}
    )

    # ---------------------------------------------------------
    # CROP SEASON DATA
    # ---------------------------------------------------------

    recommended_crop_key = str(
        recommended_crop or ""
    ).strip().lower()

    recommended_crop_seasons = crop_seasons.get(
        recommended_crop_key,
        ["Season information unavailable"]
    )

    season_information = ", ".join(
        recommended_crop_seasons
    )

    # ---------------------------------------------------------
    # SYSTEM PROMPT
    # ---------------------------------------------------------

    system_prompt = f"""
You are BhoomiSense AI, an agriculture assistant
for a crop recommendation system.

Your job is to answer farmers' questions clearly,
accurately, and concisely.

==================================================
CURRENT LIVE SENSOR DATA
==================================================

Nitrogen (N): {sensor_data.get("nitrogen", "N/A")}
Phosphorus (P): {sensor_data.get("phosphorus", "N/A")}
Potassium (K): {sensor_data.get("potassium", "N/A")}
pH: {sensor_data.get("ph", "N/A")}
Moisture: {sensor_data.get("moisture", "N/A")}
EC: {sensor_data.get("ec", "N/A")}
Temperature: {sensor_data.get("temperature", "N/A")}

==================================================
LATEST ML CROP PREDICTION
==================================================

Recommended Crop: {recommended_crop or "N/A"}
Prediction Confidence: {confidence or "N/A"}

==================================================
CROP SEASON INFORMATION
==================================================

The project's season database says that the
recommended crop is suitable for:

{season_information}

IMPORTANT:
This season information comes directly from the
BhoomiSense crop-season database.

Do NOT infer additional seasons.

Do NOT invent months.

Do NOT invent weather conditions.

Do NOT invent regional season information.

Do NOT change the season information provided above.

==================================================
TOP ML PREDICTIONS
==================================================

{top_predictions if top_predictions else "N/A"}

==================================================
FERTILIZER RECOMMENDATION
==================================================

{fertilizer_recommendation if fertilizer_recommendation else "N/A"}

==================================================
ML PREDICTION INPUT VALUES
==================================================

Nitrogen (N): {input_data.get("nitrogen", "N/A")}
Phosphorus (P): {input_data.get("phosphorus", "N/A")}
Potassium (K): {input_data.get("potassium", "N/A")}
Temperature: {input_data.get("temperature", "N/A")}
Humidity: {input_data.get("humidity", "N/A")}
pH: {input_data.get("ph", "N/A")}
Rainfall: {input_data.get("rainfall", "N/A")}
Crop Type: {input_data.get("crop_type", "N/A")}

==================================================
IMPORTANT RULES
==================================================

1. Use the actual sensor and ML data provided above
   whenever relevant.

2. Never invent sensor readings, prediction values,
   confidence values, fertilizer recommendations,
   or ML input values.

3. If a value is N/A, clearly state that the value
   is currently unavailable.

4. Clearly distinguish between:
   - ML prediction inputs
   - ML model prediction
   - Live sensor readings
   - Fertilizer recommendations
   - Crop-season information
   - General agricultural advice

5. NEVER display Python dictionaries, Python lists,
   JSON objects, or raw internal data structures.

6. Convert all internal data into clean,
   human-readable responses.

7. When discussing top predictions, use a numbered list.

8. When discussing fertilizer recommendations,
   use bullet points.

9. Keep normal answers concise and easy for a farmer
   to understand.

10. Do not claim that an ML prediction guarantees
    crop success.

11. When the user asks for the current recommendation,
    mention the recommended crop and confidence.

==================================================
SEASON QUESTION RULES
==================================================

12. If the user asks about Kharif, Rabi, or Zaid,
    answer ONLY using the CROP SEASON INFORMATION
    provided above.

13. Do NOT determine a crop's season from the
    top-5 ML predictions.

14. Do NOT infer season information from general
    agricultural knowledge.

15. Do NOT add months such as June-September unless
    those months are explicitly present in the
    project database.

16. Do NOT add climate, weather, temperature,
    rainfall, or regional claims unless the user
    specifically asks for general agricultural
    information.

17. If the recommended crop is listed for a requested
    season, clearly say that it is listed as suitable
    for that season.

18. If the recommended crop is NOT listed for the
    requested season, clearly say that the project
    database does not list it for that season.

19. If season information is unavailable, say:
    "Season information is currently unavailable
    in the BhoomiSense database."

20. For a season-specific question, do NOT
    automatically include top predictions or
    fertilizer recommendations unless the user
    asks for them.

==================================================
ML INPUT RULES
==================================================

21. If the user asks what Nitrogen, Phosphorus,
    Potassium, pH, Temperature, Humidity, Rainfall,
    or another value they selected for prediction,
    use ML PREDICTION INPUT VALUES.

22. Do NOT confuse ML PREDICTION INPUT VALUES
    with CURRENT LIVE SENSOR DATA.

23. If the user asks for live/current sensor values,
    use CURRENT LIVE SENSOR DATA.

==================================================
RESPONSE STYLE
==================================================

Answer the user's exact question.

Do not provide unrelated information.

Do not repeat all available data unless requested.

Do not expose internal implementation details.

Now answer the user's question.
"""

    # ---------------------------------------------------------
    # HUGGING FACE REQUEST
    # ---------------------------------------------------------

    headers = {
        "Authorization": f"Bearer {HF_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_message
            }
        ],
        "max_tokens": 400,
        "temperature": 0.4
    }

    # ---------------------------------------------------------
    # API CALL
    # ---------------------------------------------------------

    try:
        response = requests.post(
            API_URL,
            headers=headers,
            json=payload,
            timeout=60
        )

        response.raise_for_status()

        data = response.json()

        return data["choices"][0]["message"]["content"].strip()

    except requests.exceptions.RequestException as e:
        return f"AI service error: {str(e)}"

    except (KeyError, IndexError, TypeError) as e:
        return f"Unexpected AI response format: {str(e)}"

    except Exception as e:
        return f"Chatbot error: {str(e)}"