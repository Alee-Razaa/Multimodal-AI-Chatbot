import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start px-4 pt-24 pb-16 text-gray-800">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4 text-center text-pink-600">Welcome to MMC-AI</h1>
      <p className="text-md text-center text-gray-500 italic mb-4">
        From Thought to Reality — Text, Talk, and Generate.
      </p>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-12">
        Your all-in-one AI assistant featuring smart chatbots and a powerful image generator. Try asking questions, get creative insights, or generate stunning visuals with a single click.
      </p>

      {/* Features section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
        {/* Gemini */}
        <div className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold mb-2">Gemini Chatbot</h2>
          <p className="text-gray-600 mb-4">Chat with a powerful LLM powered by Google Gemini. Great for intelligent answers, writing, and more.</p>
          <Link to="/chatbots/gemini">
            <button className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700" >
              Try Gemini
            </button>
          </Link>
        </div>

        {/* OpenRouter */}
        <div className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold mb-2">OpenRouter Chatbot</h2>
          <p className="text-gray-600 mb-4">Access multiple models via OpenRouter. Perfect for comparing LLMs and exploring different answers.</p>
          <Link to="/chatbots/openrouter">
            <button className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700">
              Try OpenRouter
            </button>
          </Link>
        </div>

        {/* Image Generator */}
        <div className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold mb-2">Image Generator</h2>
          <p className="text-gray-600 mb-4">Describe your imagination and let AI draw it for you with Stable Diffusion XL.</p>
          <Link to="/tti">
            <button className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700">
              Generate Images
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
