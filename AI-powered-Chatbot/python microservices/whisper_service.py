# whisper_service.py
from flask import Flask, request, jsonify
import whisper
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = whisper.load_model("base")

@app.route('/whisper', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400
    audio = request.files['audio']
    audio.save("audio.mp3")
    result = model.transcribe("audio.mp3")
    os.remove("audio.mp3")
    return jsonify({"text": result["text"]})

if __name__ == '__main__':
    app.run(port=8003)
