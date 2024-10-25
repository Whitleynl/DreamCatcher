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
      
      // Set auth header explicitly before request
      if (authToken) {
        api.defaults.headers.common['Authorization'] = `Token ${authToken}`;
      }
      
      console.log('Current Auth Header:', api.defaults.headers.common['Authorization']);
      
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

  // Call fetchDreams when authToken changes
  useEffect(() => {
    if (authToken) {
      console.log('Token updated, fetching dreams...');
      fetchDreams(searchTerm);
    }
  }, [authToken, searchTerm]);

  return (
    <div className="p-8 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Search Dreams</h2>
      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <input
        type="text"
        placeholder="Search by title or description..."
        className="p-2 border border-gray-300 rounded-full mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-4">
        {dreams.length > 0 ? (
          dreams.map((dream) => (
            <li key={dream.id} className="p-4 border rounded">
              <h3 className="text-xl font-semibold">{dream.title}</h3>
              <p className="mt-2">{dream.description}</p>
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