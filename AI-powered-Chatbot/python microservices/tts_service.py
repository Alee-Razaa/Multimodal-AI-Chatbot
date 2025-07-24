# tts_service.py
from flask import Flask, request, send_file
from gtts import gTTS
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/tts', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    tts = gTTS(data['text'], lang='en')
    tts.save("output.mp3")
    return send_file("output.mp3", mimetype="audio/mpeg")

if __name__ == '__main__':
    app.run(port=8001)
