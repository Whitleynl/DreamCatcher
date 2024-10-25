import React, { useState, useEffect } from 'react';
import api from './api';

function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchDreams = async (query = '') => {
    try {
      setError(null);
      const url = query ? `dreams/search/?q=${query}` : 'dreams/';
      console.log('Fetching dreams from:', url);
      const response = await api.get(url);
      setDreams(response.data);
    } catch (error) {
      console.error('Error fetching dreams:', error);
      setError('Failed to fetch dreams');
    }
  };

  const deleteDream = async (id) => {
    try {
      setError(null);
      await api.delete(`dreams/${id}/`);
      setDreams(dreams.filter((dream) => dream.id !== id));
    } catch (error) {
      console.error('Error deleting dream:', error);
      setError('Failed to delete dream');
    }
  };

  useEffect(() => {
    fetchDreams(searchTerm);
  }, [searchTerm]);

  return (
    <div className="p-8 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Search Dreams</h2>
      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title or description..."
        className="p-2 border border-gray-300 rounded-full mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Dream List */}
      <ul className="space-y-4">
        {dreams.length > 0 ? (
          dreams.map((dream) => (
            <li key={dream.id} className="p-4 border rounded">
              <h3 className="text-xl font-semibold">{dream.title}</h3>
              <p className="mt-2">{dream.description}</p>
              {/* Delete Button */}
              <button
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => deleteDream(dream.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No dreams found.</p>
        )}
      </ul>
    </div>
  );
}

export default DreamList;