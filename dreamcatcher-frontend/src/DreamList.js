import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { CalendarDaysIcon, FaceSmileIcon, TagIcon } from '@heroicons/react/24/outline';
import api from './api';

function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [editingDream, setEditingDream] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { authToken } = useContext(AuthContext);

  const fetchDreams = async (query = '') => {
    try {
      setError(null);

      const url = query ? `dreams/search/?q=${query}` : 'dreams/';
      console.log('Fetching dreams from:', url);

      const response = await api.get(url, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      console.log('Dreams fetch successful:', response.data);
      setDreams(response.data);
    } catch (error) {
      console.error('Dream fetch error:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.config?.headers,
      });
      setError(
        error.response?.status === 401
          ? 'Authentication failed. Please try logging in again.'
          : `Failed to fetch dreams: ${
              error.response?.data?.detail || error.message
            }`
      );
    }
  };

  const updateDream = async (dreamId, updatedData) => {
    try {
      const response = await api.put(`dreams/${dreamId}/`, updatedData, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      setDreams(
        dreams.map((dream) =>
          dream.id === dreamId ? response.data : dream
        )
      );
      setIsEditing(false);
      setEditingDream(null);
    } catch (error) {
      console.error('Error updating dream:', error);
      setError('Failed to update dream');
    }
  };

  const deleteDream = async (id) => {
    try {
      await api.delete(`dreams/${id}/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
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

      {/* Display Error Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-600 text-white rounded">
          {error}
        </div>
      )}

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

      {/* Edit Modal */}
      {isEditing && editingDream && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
            <h3 className="text-xl font-bold text-gray-100 mb-4">Edit Dream</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateDream(editingDream.id, editingDream);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingDream.title}
                    onChange={(e) =>
                      setEditingDream({
                        ...editingDream,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    value={editingDream.description}
                    onChange={(e) =>
                      setEditingDream({
                        ...editingDream,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 h-32"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Mood</label>
                  <input
                    type="text"
                    value={editingDream.mood}
                    onChange={(e) =>
                      setEditingDream({
                        ...editingDream,
                        mood: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Lucidity Level (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingDream.lucidity_level}
                    onChange={(e) =>
                      setEditingDream({
                        ...editingDream,
                        lucidity_level: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Key Symbols</label>
                  <input
                    type="text"
                    value={editingDream.key_symbols || ''}
                    onChange={(e) =>
                      setEditingDream({
                        ...editingDream,
                        key_symbols: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-100"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingDream.recurring}
                    onChange={(e) =>
                      setEditingDream({
                        ...editingDream,
                        recurring: e.target.checked,
                      })
                    }
                    className="bg-gray-700 border border-gray-600 rounded"
                  />
                  <label className="text-gray-300">Recurring Dream</label>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingDream(null);
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <p className="text-gray-300 mb-4">{dream.description}</p>

              {/* Footer */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-200 mb-4">
                <span className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                  {new Date(dream.date_logged).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <FaceSmileIcon className="w-5 h-5 text-gray-400" />
                  Mood: {dream.mood}
                </span>
                {dream.key_symbols && (
                  <span className="flex items-center gap-2">
                    <TagIcon className="w-5 h-5 text-gray-400" />
                    Symbols: {dream.key_symbols}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm"
                  onClick={() => {
                    // Implement the analyze function
                    console.log('Analyze dream:', dream.id);
                  }}
                >
                  Analyze
                </button>
                <button
                  className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors text-sm"
                  onClick={() => {
                    setEditingDream(dream);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors text-sm"
                  onClick={() => deleteDream(dream.id)}
                >
                  Delete
                </button>
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