import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from './redux/newChatSlice';
import ReactMarkdown from 'react-markdown';

const OpenRouterDirect = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const conversation = useSelector((state) => state.counter.openrouter);
  const dispatch = useDispatch();

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', message: userInput };
    dispatch(addMessage({ bot: 'openrouter', message: userMessage }));
    setUserInput('');
    setLoading(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/mixtral-8x7b-instruct',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInput },
          ],
        }),
      });

      const data = await res.json();
      const botReply = data?.choices?.[0]?.message?.content || 'No response generated.';
      const botMessage = { sender: 'bot', message: botReply };
      dispatch(addMessage({ bot: 'openrouter', message: botMessage }));
    } catch (err) {
      console.error(err);
      const errorMessage = { sender: 'bot', message: 'Failed to fetch AI response.' };
      dispatch(addMessage({ bot: 'openrouter', message: errorMessage }));
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start px-4 pt-24 pb-32">
      <div className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
        OpenRouter-Powered Chatbot
      </div>

      {/* Chat display area */}
      <div className="w-full max-w-4xl h-[600px] overflow-y-auto bg-gray-50 rounded-xl p-6 shadow-inner space-y-4">
        {conversation.map((item, index) => (
          <div key={index} className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-base shadow-md whitespace-pre-wrap ${
                item.sender === 'user'
                  ? 'bg-pink-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <ReactMarkdown>{item.message}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] px-4 py-3 rounded-2xl text-base shadow-md bg-gray-200 text-gray-800 rounded-bl-none">
              <p>Typing...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="fixed bottom-0 w-full flex justify-center items-center px-4 pb-6">
        <div className="w-full max-w-3xl flex bg-white border border-gray-300 shadow-md rounded-full overflow-hidden">
          <textarea
            rows={1}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none resize-none"
            placeholder="Ask anything..."
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-medium transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenRouterDirect;