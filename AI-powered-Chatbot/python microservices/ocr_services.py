# ocr_service.py
from flask import Flask, request, jsonify
from flask_cors import CORS

import easyocr
import os

app = Flask(__name__)
CORS(app)
reader = easyocr.Reader(['en'])

@app.route('/ocr', methods=['POST'])
def extract_text():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    image = request.files['image']
    image.save("temp.jpg")
    result = reader.readtext("temp.jpg", detail=0)
    os.remove("temp.jpg")
    return jsonify({"text": " ".join(result)})

if __name__ == '__main__':
    app.run(port=8002)
