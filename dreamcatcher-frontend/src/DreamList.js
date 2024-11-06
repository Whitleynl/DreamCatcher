import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AuthContext } from './AuthContext';
import { CalendarDaysIcon, FaceSmileIcon, TagIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import api from './api';

function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [editingDream, setEditingDream] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedDreamId, setExpandedDreamId] = useState(null);
  const [dreamToDelete, setDreamToDelete] = useState(null);
  const { authToken } = useContext(AuthContext);

  const toggleDreamExpansion = (dreamId) => {
    setExpandedDreamId(expandedDreamId === dreamId ? null : dreamId);
  };

  const handleDeleteClick = (e, dream) => {
    e.stopPropagation();
    setDreamToDelete(dream);
  };

  const confirmDelete = async () => {
    if (dreamToDelete) {
      await deleteDream(dreamToDelete.id);
      setDreamToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDreamToDelete(null);
  };

  const fetchDreams = async () => {
    try {
      setError(null);
      const response = await api.get('dreams/', {
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

  const filteredDreams = useMemo(() => {
    if (!searchTerm) return dreams;
    
    const searchWords = searchTerm.toLowerCase()
      .split(' ')
      .filter(word => word.length >= 3);
      
    if (searchWords.length === 0) return dreams;
    
    return dreams.filter(dream => {
      const dreamText = `${dream.title} ${dream.description} ${dream.mood} ${dream.key_symbols || ''}`
        .toLowerCase();
      
      return searchWords.every(word => {
        const regex = new RegExp(`\\b${word}\\b`);
        return regex.test(dreamText);
      });
    });
  }, [dreams, searchTerm]);

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
      fetchDreams();
    }
  }, [authToken]);

  return (
    <div className="p-4 sm:p-8 bg-gray-800 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Search Dreams</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-600 text-white rounded">
          {error}
        </div>
      )}

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

      {/* Custom Delete Confirmation Modal */}
      {dreamToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md border border-gray-700">
            <h3 className="text-xl font-bold text-gray-100 mb-2">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete the dream "{dreamToDelete.title}"? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition-colors"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dreams Grid */}
      <div className="space-y-2">
        {filteredDreams.length > 0 ? (
          filteredDreams.map((dream) => (
            <div
              key={dream.id}
              className={`bg-gray-750 border border-gray-700 rounded-lg
                         hover:bg-gray-700 transition-colors duration-200
                         ${expandedDreamId === dream.id ? 'p-6' : 'p-4'}`}
            >
              {/* Collapsed View */}
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleDreamExpansion(dream.id)}
              >
                <div className="flex items-center space-x-4 flex-grow">
                  <h3 className="text-xl font-semibold text-gray-100 truncate">
                    {dream.title}
                  </h3>
                  <div className="flex space-x-2">
                    {dream.lucidity_level > 3 && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                        Lucid
                      </span>
                    )}
                    {dream.recurring && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                        Recurring
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(dream.date_logged).toLocaleDateString()}
                  </span>
                </div>
                {expandedDreamId === dream.id ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* Expanded View */}
              {expandedDreamId === dream.id && (
                <div className="mt-4">
                  <p className="text-gray-300 mb-4">{dream.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-200 mb-4">
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
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Analyze dream:', dream.id);
                      }}
                    >
                      Analyze
                    </button>
                    <button
                      className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingDream(dream);
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors text-sm"
                      onClick={(e) => handleDeleteClick(e, dream)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-8">
            {dreams.length === 0 ? "No dreams found." : "No dreams match your search."}
          </p>
        )}
      </div>
    </div>
  );
}

export default DreamList;