import React, { useRef, useState } from 'react';
import Dimage from '../assets/image.jpg';

function ImageGenerator() {
    const KEY = process.env.REACT_APP_IMAGE_API_KEY;
  const [image, setImage] = useState('/');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleGenerate = async () => {
  const prompt = inputRef.current?.value;
  if (!prompt) return;

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('model', 'stable-diffusion-xl-v1-0');
    formData.append('output_format', 'png');
    formData.append('aspect_ratio', '1:1');
    formData.append('style_preset', 'photographic');
    formData.append('cfg_scale', '7');
    formData.append('steps', '30');

    const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KEY}`,
        'Accept': 'image/*', // or 'application/json' if expecting metadata
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("API Error:", JSON.stringify(error, null, 2));
      alert(`Error: ${error.message || "Failed to generate image."}`);
      return;
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    setImage(imageUrl);
  } catch (err) {
    console.error("Fetch Error:", err);
    alert("Something went wrong while generating the image.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start px-4 pt-24 pb-32">
      {/* Top heading */}
      <div className="w-full max-w-4xl fixed top-0 bg-white border-b border-gray-300 p-4 flex justify-between items-center z-10">
        <h2 className="text-xl font-semibold text-gray-800">Image Generator</h2>
      </div>

      {/* Image display */}
      <div className="w-full max-w-4xl flex flex-col items-center space-y-4 mt-20">
        <img
          src={image === '/' ? Dimage : image}
          alt="Generated content"
          className="w-[512px] max-w-full rounded-xl shadow-md border"
        />
        {loading && (
          <>
            <div className="h-2 bg-pink-600 w-[512px] rounded-full transition-all duration-[5s]" />
            <p className="text-gray-600 text-lg">Generating image...</p>
          </>
        )}
      </div>

      {/* Input and button */}
      <div className="fixed bottom-0 w-full flex justify-center items-center px-4 pb-6">
        <div className="w-full max-w-3xl flex bg-white border border-gray-300 shadow-md rounded-full overflow-hidden">
          <input
            ref={inputRef}
            type="text"
            placeholder="Describe your image..."
            className="flex-1 px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleGenerate}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 font-medium transition"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
