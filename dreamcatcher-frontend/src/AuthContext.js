import React, { createContext, useState, useEffect } from "react";
import api from "./api";

import React, { useState, useEffect } from 'react';
import api from './api';

function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchDreams = async (query = '') => {
    try {
      setError(null);
      const url = query ? `search/?q=${query}` : '';
      const response = await api.get(url);
      setDreams(response.data);
    } catch (error) {
      setError('Failed to fetch dreams');
      console.error('Error fetching dreams:', error);
    }
  };

  const deleteDream = async (id) => {
    try {
      setError(null);
      await api.delete(`${id}/`);
      setDreams(dreams.filter((dream) => dream.id !== id));
    } catch (error) {
      setError('Failed to delete dream');
      console.error('Error deleting dream:', error);
    }
  };

  useEffect(() => {
    fetchDreams(searchTerm);
  }, [searchTerm]);

  return (
    <div className="p-8 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Search Dreams</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {/* Rest of the component remains the same */}
    </div>
  );
}

export default DreamList;
