import React, { useState } from 'react';
import api from './api';

function DreamForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('dreams/', {
        title,
        description,
        mood: "neutral",
        lucidity_level: 3,
        recurring: false,
        key_symbols: "None"
      });
      setMessage('Dream submitted successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting dream:', error);
      setMessage('Failed to submit dream');
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-800 shadow rounded-lg">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-100">Submit a New Dream</h2>
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
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Submit Dream
        </button>
      </form>
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