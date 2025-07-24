import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTTS = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8001/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    const blob = await res.blob();
    setAudioUrl(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="p-4 border rounded-xl shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Text to Speech</h2>
      <textarea
        className="w-full border p-2 mb-2 rounded"
        rows={3}
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleTTS}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Converting...' : 'Convert to Speech'}
      </button>
      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}
    </div>
    </div>
  );
};

export default TextToSpeech;