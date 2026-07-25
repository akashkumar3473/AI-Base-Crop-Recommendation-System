
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

# Load dataset
h = "C:/Users/HP/Downloads/akash/aaaaaa/Deleted/bhoomi-sense (refined)/dataset/Crop_recommendation.csv"

df = pd.read_csv(h)

# Features and labels
X = df.drop("label", axis=1)
y = df["label"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# Train model
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Create models folder if not exists
os.makedirs("../models", exist_ok=True)

# Save model
joblib.dump(model, "../models/crop_recommendation_model.pkl")

print("Model saved successfully!")