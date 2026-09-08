import streamlit as st
import sys
from pathlib import Path

# Get project directory
BASE_DIR = Path(__file__).resolve().parent

# Add backend folder to Python path
BACKEND_DIR = BASE_DIR / "backend"
sys.path.insert(0, str(BACKEND_DIR))

# Import your existing ML service
from ml_service import ml_service


# Streamlit page configuration
st.set_page_config(
    page_title="BhoomiSense",
    page_icon="🌱",
    layout="wide"
)


# Title
st.title("🌱 BhoomiSense")
st.subheader("AI-Based Crop Recommendation System")

st.write("Streamlit deployment setup is working!")

st.divider()


# Check ML models
st.subheader("🤖 ML Model Status")

if ml_service.models_loaded:
    st.success("✅ All ML models loaded successfully!")

    st.write(
        "Your existing crop prediction and yield prediction models "
        "are ready to use."
    )

else:
    st.error("❌ ML models could not be loaded.")