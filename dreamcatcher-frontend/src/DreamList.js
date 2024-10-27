import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from './api';

function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  const fetchDreams = async (query = '') => {
    try {
      setError(null);
      
      if (authToken) {
        api.defaults.headers.common['Authorization'] = `Token ${authToken}`;
      }
      
      const url = query ? `dreams/search/?q=${query}` : 'dreams/';
      console.log('Fetching dreams from:', url);
      
      const response = await api.get(url);
      console.log('Dreams fetch successful:', response.data);
      setDreams(response.data);
    } catch (error) {
      console.error('Dream fetch error:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.config?.headers
      });
      setError(
        error.response?.status === 401 
          ? 'Authentication failed. Please try logging in again.' 
          : `Failed to fetch dreams: ${error.response?.data?.detail || error.message}`
      );
    }
  };

  const deleteDream = async (id) => {
    try {
      if (authToken) {
        api.defaults.headers.common['Authorization'] = `Token ${authToken}`;
      }
      await api.delete(`dreams/${id}/`);
      setDreams(dreams.filter((dream) => dream.id !== id));
    } catch (error) {
      console.error('Error deleting dream:', error);
      setError('Failed to delete dream');
    }
  };

  useEffect(() => {
    if (authToken) {
      console.log('Token updated, fetching dreams...');
      fetchDreams(searchTerm);
    }
  }, [authToken, searchTerm]);

  return (
    <div className="p-4 sm:p-8 bg-gray-800 shadow rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-100">Search Dreams</h2>
      {error && (
        <div className="p-3 mb-4 bg-red-900/50 text-red-300 rounded">
          {error}
        </div>
      )}
      <input
        type="text"
        placeholder="Search by title or description..."
        className="p-2 w-full bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-4">
        {dreams.length > 0 ? (
          dreams.map((dream) => (
            <li key={dream.id} className="p-4 border border-gray-700 rounded bg-gray-800 hover:bg-gray-750">
              <h3 className="text-xl font-semibold text-gray-100">{dream.title}</h3>
              <p className="mt-2 text-gray-300">{dream.description}</p>
              <button
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                onClick={() => deleteDream(dream.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No dreams found.</p>
        )}
      </ul>
    </div>
  );
}

export default DreamList;