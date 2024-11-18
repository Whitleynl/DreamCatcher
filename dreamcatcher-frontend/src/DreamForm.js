import React, { useState } from 'react';
import api from './api';
import { useDreamContext } from './DreamContext';

function DreamForm() {
  const { addDream } = useDreamContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState('neutral');
  const [lucidityLevel, setLucidityLevel] = useState(3);
  const [recurring, setRecurring] = useState(false);
  const [keySymbols, setKeySymbols] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('dreams/', {
        title,
        description,
        mood,
        lucidity_level: lucidityLevel,
        recurring,
        key_symbols: keySymbols || 'None'
      });
      addDream(response.data);
      setMessage('Dream submitted successfully!');
      setTitle('');
      setDescription('');
      setMood('neutral');
      setLucidityLevel(3);
      setRecurring(false);
      setKeySymbols('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error submitting dream:', error.response?.data || error);
      setMessage(`Failed to submit dream: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-800 shadow rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-gray-100 text-xl font-bold mb-4"
      >
        <span>Submit a New Dream!</span>
        <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dream title"
              className="p-2 w-full bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your dream"
              className="p-2 w-full bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 h-32"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Mood</label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="p-2 w-full bg-gray-700 border border-gray-600 rounded text-gray-100"
            >
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="scared">Scared</option>
              <option value="anxious">Anxious</option>
              <option value="peaceful">Peaceful</option>
              <option value="excited">Excited</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Lucidity Level (1-5)</label>
            <input
              type="range"
              min="1"
              max="5"
              value={lucidityLevel}
              onChange={(e) => setLucidityLevel(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Not Lucid</span>
              <span>Current: {lucidityLevel}</span>
              <span>Fully Lucid</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Key Symbols</label>
            <input
              type="text"
              value={keySymbols}
              onChange={(e) => setKeySymbols(e.target.value)}
              placeholder="Enter key symbols or themes (optional)"
              className="p-2 w-full bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                className="mr-2"
              />
              Recurring Dream
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Submit Dream
          </button>
        </form>
      </div>
      {message && (
        <p className={`mt-4 ${
          message.includes('Failed') ? 'text-red-400' : 'text-green-400'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default DreamForm;