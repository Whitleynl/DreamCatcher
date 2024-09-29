import React, { useState } from 'react';
import axios from 'axios';

function DreamForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(''); 
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (event) => { 
    console.log('API URL:', apiUrl);
    event.preventDefault(); 
    try {
      await axios.post(`${apiUrl}`, {
        title,
        description,
        mood: "neutral",  // Temporary fixed values
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
    <div className="p-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Submit a New Dream</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Dream title"
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your dream"
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Dream
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default DreamForm;