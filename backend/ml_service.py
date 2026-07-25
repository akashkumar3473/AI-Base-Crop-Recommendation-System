# Enhanced ML Service for Crop Recommendation
import joblib
import pandas as pd
import numpy as np
import os
import traceback

class CropRecommendationService:
    def __init__(self):
        """Initialize the ML service with trained models"""
        self.crop_model = None
        self.yield_model = None
        self.crop_type_encoder = None
        self.crop_encoder = None
        self.models_loaded = False
        self.load_models()
    
    def load_models(self):
        """Load the trained ML models and encoders with better error handling"""
        try:
            print("Loading ML models...")
            
            # Get the directory where this script is located
            script_dir = os.path.dirname(os.path.abspath(__file__))
            print(f"Script directory: {script_dir}")
            
            # Check if files exist
            model_files = {
                'crop_model': os.path.join(script_dir, 'crop_prediction_model.pkl'),
                'yield_model': os.path.join(script_dir, 'yield_prediction_model.pkl'),
                'crop_type_encoder': os.path.join(script_dir, 'crop_type_encoder.pkl'),
                'crop_encoder': os.path.join(script_dir, 'crop_encoder.pkl')
            }
            
            for name, filepath in model_files.items():
                if not os.path.exists(filepath):
                    print(f"File not found: {filepath}")
                    return False
                else:
                    print(f"Found: {os.path.basename(filepath)}")
            
            # Load models with error handling
            self.crop_model = joblib.load(model_files['crop_model'])
            print("Crop prediction model loaded")
            
            self.yield_model = joblib.load(model_files['yield_model'])
            print("Yield prediction model loaded")
            
            self.crop_type_encoder = joblib.load(model_files['crop_type_encoder'])
            print("Crop type encoder loaded")
            
            self.crop_encoder = joblib.load(model_files['crop_encoder'])
            print("Crop encoder loaded")
            
            self.models_loaded = True
            print("All ML models loaded successfully!")
            print(f"   - Crop Model: {type(self.crop_model).__name__}")
            print(f"   - Yield Model: {type(self.yield_model).__name__}")
            
            return True
            
        except Exception as e:
            print(f"Error loading models: {e}")
            print(f"Traceback: {traceback.format_exc()}")
            self.models_loaded = False
            return False
    
    def predict_top_5_crops_and_yields(self, input_data):
        """
        Predict top 5 crops and their yields based on environmental conditions
        """
        if not self.models_loaded:
            return [{"Crop": "Models Not Loaded", "Predicted_Yield_t_ha": 0, "Error": "ML models failed to load"}]
        
        try:
            print(f"Processing prediction request with data: {input_data}")
            
            # Validate and clean input data
            validated_data = self.validate_input_data(input_data)
            print(f"Validated data: {validated_data}")
            
            # Convert to DataFrame
            df_input = pd.DataFrame([validated_data])
            
            # Prepare features for crop prediction (exclude Crop column)
            crop_features = df_input[['Crop_Type', 'N', 'P', 'K', 'pH', 'rainfall', 'temperature', 'Area_in_hectares']]
            
            # Get crop probabilities
            probabilities = self.crop_model.predict_proba(crop_features)[0]
            print(f"Got crop probabilities: {len(probabilities)} crops")
            
            # Get top 5 crop indices
            top_5_indices = np.argsort(probabilities)[-5:][::-1]
            print(f"Top 5 crop indices: {top_5_indices}")
            
            # Predict yield for each top crop
            top_predictions = []
            for i, crop_index in enumerate(top_5_indices):
                try:
                    # Get crop name
                    crop_name = self.crop_encoder.inverse_transform([crop_index])[0]
                    
                    # Prepare data for yield prediction (include Crop column)
                    yield_input = df_input.copy()
                    yield_input['Crop'] = crop_index
                    
                    # Ensure correct column order for yield model
                    yield_features = yield_input[['Crop_Type', 'Crop', 'N', 'P', 'K', 'pH', 'rainfall', 'temperature', 'Area_in_hectares']]
                    
                    # Predict yield
                    predicted_yield = self.yield_model.predict(yield_features)[0]
                    
                    top_predictions.append({
                        "Crop": crop_name,
                        "Predicted_Yield_t_ha": round(float(predicted_yield), 2),
                        "Rank": i + 1,
                        "Probability": round(float(probabilities[crop_index]), 4)
                    })
                    
                    print(f"Crop {i+1}: {crop_name} - Yield: {predicted_yield:.2f} t/ha")
                    
                except Exception as e:
                    print(f"Error processing crop {crop_index}: {e}")
                    continue
            
            print(f"Successfully generated {len(top_predictions)} predictions")
            return top_predictions
            
        except Exception as e:
            print(f"Error in prediction: {e}")
            print(f"Traceback: {traceback.format_exc()}")
            return [{"Crop": "Prediction Error", "Predicted_Yield_t_ha": 0, "Error": str(e)}]
    
    def get_crop_type_mapping(self):
        """Get mapping of crop types"""
        return {
            'kharif': 0,
            'rabi': 1, 
            'summer': 2
        }
    
    def validate_input_data(self, data):
        """Validate and clean input data with better error handling"""
        validated_data = {}
        
        # Default values
        defaults = {
            'Crop_Type': 0,  # kharif
            'N': 80,
            'P': 40,
            'K': 40,
            'pH': 6.5,
            'rainfall': 1000,
            'temperature': 25,
            'Area_in_hectares': 1
        }
        
        for key, default_value in defaults.items():
            try:
                value = data.get(key, default_value)
                
                # Special handling for Crop_Type
                if key == 'Crop_Type':
                    if isinstance(value, str):
                        crop_type_mapping = self.get_crop_type_mapping()
                        validated_data[key] = crop_type_mapping.get(value.lower(), default_value)
                    else:
                        validated_data[key] = int(value)
                elif key in ['N', 'P', 'K', 'pH', 'rainfall', 'temperature', 'Area_in_hectares']:
                    validated_data[key] = float(value)
                else:
                    validated_data[key] = int(value)
                    
                # Validate ranges
                if key == 'pH' and (validated_data[key] < 0 or validated_data[key] > 14):
                    validated_data[key] = 6.5
                elif key == 'temperature' and (validated_data[key] < -50 or validated_data[key] > 60):
                    validated_data[key] = 25
                elif key in ['N', 'P', 'K'] and validated_data[key] < 0:
                    validated_data[key] = defaults[key]
                    
            except (ValueError, TypeError) as e:
                print(f"Invalid value for {key}: {data.get(key)}, using default: {default_value}")
                validated_data[key] = default_value
        
        return validated_data
    
    def get_model_info(self):
        """Get information about loaded models"""
        if not self.models_loaded:
            return {"status": "Models not loaded", "error": "Failed to load ML models"}
        
        return {
            "status": "Models loaded successfully",
            "crop_model": type(self.crop_model).__name__,
            "yield_model": type(self.yield_model).__name__,
            "crop_encoder_classes": len(self.crop_encoder.classes_) if hasattr(self.crop_encoder, 'classes_') else "Unknown",
            "crop_type_encoder_classes": len(self.crop_type_encoder.classes_) if hasattr(self.crop_type_encoder, 'classes_') else "Unknown"
        }

# Global instance
print("Initializing ML Service...")
ml_service = CropRecommendationService()