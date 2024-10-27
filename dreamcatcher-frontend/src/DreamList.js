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
    <div className="p-4 sm:p-8 bg-gray-800 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Search Dreams</h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or description..."
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg 
                     text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dreams Grid */}
      <div className="space-y-6">
        {dreams.length > 0 ? (
          dreams.map((dream) => (
            <div 
              key={dream.id} 
              className="bg-gray-750 p-6 rounded-lg border border-gray-700
                         hover:bg-gray-700 transition-colors duration-200"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-100">
                  {dream.title}
                </h3>
                <div className="flex space-x-2">
                  {dream.lucidity_level > 3 && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 
                                   rounded text-sm">
                      Lucid
                    </span>
                  )}
                  {dream.recurring && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 
                                   rounded text-sm">
                      Recurring
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4">
                {dream.description}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 
                             border-t border-gray-700">
                <div className="flex space-x-4 text-sm text-gray-400">
                  <span>{new Date(dream.date_logged).toLocaleDateString()}</span>
                  <span>Mood: {dream.mood}</span>
                  {dream.key_symbols && (
                    <span>Symbols: {dream.key_symbols}</span>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  <button 
                    className="p-2 hover:bg-gray-600 rounded text-gray-300
                               hover:text-gray-100 transition-colors"
                    onClick={() => {/* Add analyze function */}}
                  >
                    Analyze
                  </button>
                  <button 
                    className="p-2 hover:bg-gray-600 rounded text-gray-300
                               hover:text-gray-100 transition-colors"
                    onClick={() => {/* Add edit function */}}
                  >
                    Edit
                  </button>
                  <button 
                    className="p-2 hover:bg-red-600 rounded text-gray-300
                               hover:text-red-100 transition-colors"
                    onClick={() => deleteDream(dream.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-8">No dreams found.</p>
        )}
      </div>
    </div>
  );
}

export default DreamList;