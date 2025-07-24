import React, { useState } from 'react';

const ImageToText = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOCR = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('http://localhost:8002/ocr', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to fetch from server');

      const data = await res.json();
      setText(data.text || 'No text found.');
    } catch (error) {
      console.error('OCR error:', error);
      setText('An error occurred while extracting text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Image to Text (OCR)</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleOCR}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Extracting...' : 'Extract Text'}
        </button>

        {text && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-1">Extracted Text:</h4>
            <p className="whitespace-pre-wrap text-gray-800">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToText;
