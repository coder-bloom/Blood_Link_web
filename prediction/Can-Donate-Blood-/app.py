# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import modelTrain, predictor  # your ML model logic
import numpy as np

app = Flask(__name__)
CORS(app)  # allow frontend to call this API from a different port

# Load the model once
model, selected_columns, gender_encoder = modelTrain()

@app.route("/api/predict-eligibility", methods=["POST"])
def predict_eligibility():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"eligible": False, "message": "No input data received"}), 400

        # Prepare input for the model
        input_data = [
            data["age"],
            data["gender"],
            data["weight"],
            data["hemoglobin"],
            data["num_donations"],
            data["months_last"]
        ]

        # Predict eligibility
        result = predictor(input_data, model, selected_columns, gender_encoder)

        # Handle if predictor returns a list, tuple, or numpy array
        if isinstance(result, (list, tuple, np.ndarray)):
            result = result[0]

        # Convert to standard Python bool
        eligible = bool(result)

        # Prepare message
        message = "Eligible to Donate Blood ✅" if eligible else "Not Eligible to Donate Blood ❌"

        return jsonify({"eligible": eligible, "message": message})

    except Exception as e:
        return jsonify({"eligible": False, "message": f"Server Error: {e}"}), 500

if __name__ == "__main__":
    print("✅ Python prediction server running at http://127.0.0.1:5001")
    app.run(debug=True, port=5001)
