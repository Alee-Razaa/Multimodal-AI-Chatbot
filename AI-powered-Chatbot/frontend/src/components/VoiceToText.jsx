import React, { useState } from 'react';

const VoiceToText = () => {
  const [audio, setAudio] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranscribe = async () => {
    if (!audio) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('audio', audio);

    const res = await fetch('http://localhost:8003/whisper', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setTranscript(data.text || 'No transcription found.');
    setLoading(false);
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="p-4 border rounded-xl shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Voice to Text (Whisper)</h2>
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudio(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleTranscribe}
        className="bg-purple-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Transcribing...' : 'Transcribe Audio'}
      </button>
      {transcript && (
        <div className="mt-4">
          <h4 className="font-semibold">Transcribed Text:</h4>
          <p className="whitespace-pre-wrap">{transcript}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default VoiceToText;
