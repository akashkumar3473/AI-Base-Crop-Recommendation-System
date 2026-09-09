from flask import Flask, request, jsonify, send_from_directory
from datetime import datetime
from flask_cors import CORS
import hashlib
import jwt
import os
import subprocess
try:
    from .ml_service import ml_service
    from .fertilizer_data import fertilizer_dictionary
except ImportError:
    from ml_service import ml_service
    from fertilizer_data import fertilizer_dictionary

# Initialize Flask app and enable CORS
FRONTEND_DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist'))
app = Flask(__name__, static_folder=FRONTEND_DIST, static_url_path='')
CORS(app)

def get_fertilizer_recommendation(crop_name, N, P, K):
    crop_data = fertilizer_dictionary.get(crop_name.lower(), {})
    recommendation = []

    if N < 50:
        recommendation.append(crop_data.get("low_nitrogen", "Add Nitrogen fertilizer"))
    if P < 50:
        recommendation.append(crop_data.get("low_phosphorus", "Add Phosphorus fertilizer"))
    if K < 50:
        recommendation.append(crop_data.get("low_potassium", "Add Potassium fertilizer"))

    if not recommendation:
        recommendation.append("Soil nutrients are balanced")

    return recommendation

# Set secret key for JWT tokens
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')

# --- User Data Store (In production, use a proper database) ---
users_db = {
    'admin@bhoomisense.com': {
        'password': hashlib.sha256('admin123'.encode()).hexdigest(),
        'name': 'Admin User',
        'city': 'Delhi',
        'phone': '+91 98765 43210'
    }
}

# --- Global Data Stores ---
latest_sensor_data = {
    'nitrogen': 'N/A',
    'phosphorus': 'N/A',
    'potassium': 'N/A',
    'ph': 'N/A',
    'moisture': 'N/A',
    'ec': 'N/A',
    'temperature': 'N/A'
}

sensor_history = []

# --- API Endpoint for ESP32 Device ---
@app.route('/data', methods=['POST'])
def receive_data():
    """Receives sensor data from ESP32 and updates server state."""
    global latest_sensor_data, sensor_history
    
    if not request.is_json:
        return jsonify(message="Error: Request must be JSON"), 400

    data = request.get_json()
    
    for key in latest_sensor_data:
        latest_sensor_data[key] = data.get(key, latest_sensor_data[key])

    historical_record = latest_sensor_data.copy()
    historical_record['time'] = datetime.now().strftime('%H:%M:%S')
    sensor_history.append(historical_record)

    if len(sensor_history) > 200:
        sensor_history.pop(0)

    print(f"Received Data: {latest_sensor_data}")
    return jsonify(message="Data received successfully!"), 200

# --- Authentication Endpoints ---
@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        city = data.get('city')
        phone = data.get('phone')
        
        if not all([email, password, name, city, phone]):
            return jsonify({'error': 'All fields are required'}), 400
        
        if email in users_db:
            return jsonify({'error': 'User already exists'}), 400
        
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters long'}), 400
        
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        users_db[email] = {
            'password': hashed_password,
            'name': name,
            'city': city,
            'phone': phone
        }
        
        token = jwt.encode({
            'email': email,
            'name': name,
            'city': city,
            'exp': datetime.utcnow().timestamp() + 86400
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'message': 'User registered successfully',
            'token': token,
            'user': {
                'name': name,
                'city': city,
                'email': email
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        if email not in users_db:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        if users_db[email]['password'] != hashed_password:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        token = jwt.encode({
            'email': email,
            'name': users_db[email]['name'],
            'city': users_db[email]['city'],
            'exp': datetime.utcnow().timestamp() + 86400
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'name': users_db[email]['name'],
                'city': users_db[email]['city'],
                'email': email
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/verify', methods=['POST'])
def verify_token():
    """Verify JWT token"""
    try:
        data = request.get_json()
        token = data.get('token')
        
        if not token:
            return jsonify({'error': 'Token is required'}), 400
        
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        
        return jsonify({
            'valid': True,
            'user': {
                'name': payload['name'],
                'city': payload['city'],
                'email': payload['email']
            }
        }), 200
        
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- ML Prediction Endpoint ---
@app.route('/predict', methods=['POST'])
def predict_crops():
    """Predict top 5 crops and their yields based on sensor data"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        validated_data = ml_service.validate_input_data(data)
        crop_type_mapping = ml_service.get_crop_type_mapping()
        
        if isinstance(validated_data.get('Crop_Type'), str):
            crop_type_str = validated_data['Crop_Type'].lower()
            validated_data['Crop_Type'] = crop_type_mapping.get(crop_type_str, 0)
        
        predictions = ml_service.predict_top_5_crops_and_yields(validated_data)
        
        if not predictions or 'Error' in predictions[0]:
            return jsonify({
                'error': 'Prediction failed',
                'details': predictions
            }), 500

        recommended_crop = predictions[0].get('Crop', 'Unknown')
        probability = float(predictions[0].get('Probability', 0.0))
        confidence = f"{round(probability * 100, 2)}%"

        top_predictions = [
            {
                'crop': item.get('Crop', ''),
                'probability': f"{round(float(item.get('Probability', 0.0)) * 100, 2)}%"
            }
            for item in predictions
        ]

        fertilizer_recommendation = get_fertilizer_recommendation(
            recommended_crop,
            validated_data.get('N', 80),
            validated_data.get('P', 40),
            validated_data.get('K', 40)
        )

        return jsonify({
            'recommended_crop': recommended_crop,
            'confidence': confidence,
            'top_predictions': top_predictions,
            'fertilizer_recommendation': fertilizer_recommendation
        }), 200
        
    except Exception as e:
        print(f"Error in crop prediction: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/ml-status', methods=['GET'])
def get_ml_status():
    """Check if ML models are loaded and ready"""
    model_info = ml_service.get_model_info()
    return jsonify(model_info), 200

# --- API Endpoint for React Frontend ---
@app.route('/api/dashboard-data', methods=['GET'])
def get_dashboard_data():
    """Provides all necessary data for the React dashboard."""
    return jsonify({
        'latest': latest_sensor_data,
        'history': sensor_history[-50:]
    })

# --- Routes for Serving React Application ---
@app.route('/')
def serve_react_app():
    """Serves index.html of React application."""
    if os.path.exists(os.path.join(app.static_folder, 'index.html')):
        return send_from_directory(app.static_folder, 'index.html')
    return jsonify({'message': 'Bhoomi Sense API is running. Frontend build static files not found.'})

@app.route('/<path:path>')
def catch_all(path):
    """Serve static assets from dist when they exist, otherwise fallback to SPA index.html"""
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return send_from_directory(app.static_folder, path)
    if os.path.exists(os.path.join(app.static_folder, 'index.html')):
        return send_from_directory(app.static_folder, 'index.html')
    return jsonify({'error': 'Not found'}), 404

# --- Main Execution ---
if __name__ == '__main__':
    print("Flask server starting...")
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend'))
    dist_index = os.path.join(FRONTEND_DIST, 'index.html')

    def ensure_frontend_built():
        try:
            npm_exe = 'npm.cmd' if os.name == 'nt' else 'npm'
            lockfile_path = os.path.join(frontend_dir, 'package-lock.json')
            if os.path.exists(lockfile_path):
                print(" - Installing frontend dependencies...")
                subprocess.run([npm_exe, 'ci', '--no-audit', '--no-fund'], check=True, shell=False, cwd=frontend_dir)
            else:
                print(" - Installing frontend dependencies...")
                subprocess.run([npm_exe, 'install', '--no-audit', '--no-fund'], check=True, shell=False, cwd=frontend_dir)

            print(" - Building frontend...")
            subprocess.run([npm_exe, 'run', 'build'], check=True, shell=False, cwd=frontend_dir)
            if os.path.exists(dist_index):
                print(" - Frontend build completed successfully.")
        except Exception as build_err:
            print(f" - Frontend build failed: {build_err}")

    if os.environ.get('SKIP_BUILD') == '1':
        print(" - SKIP_BUILD=1 set. Skipping frontend build.")
    else:
        if not os.path.exists(dist_index):
            print(" - Frontend build not found. Building frontend...")
            ensure_frontend_built()

    print(" - ESP32 should POST data to: http://<your_ip_address>:5000/data")
    print(" - React app will fetch from: http://<your_ip_address>:5000/api/dashboard-data")
    app.run(host='0.0.0.0', port=5000, debug=True)