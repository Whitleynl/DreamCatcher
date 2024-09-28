import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

    const fetchDreams = async (query = '') => {
      try {
        const url = query
          ? `http://localhost:8000/api/dreams/search/?q=${query}`
          : 'http://localhost:8000/api/dreams/';

        const response = await axios.get(url);
        setDreams(response.data);
      } catch (error) {
        console.error('Error fetching dreams:', error);
      }
    };

    useEffect(() => {
        fetchDreams(searchTerm);
      }, [searchTerm]);
    
  return (
    <div className="p-8 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Search Dreams</h2>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title or description..."
        className="p-2 border border-gray-300 rounded-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Dream List */}
      <ul>
        {dreams.map((dream) => (
          <li key={dream.id} className="mb-4">
            <h3 className="text-xl font-semibold">{dream.title}</h3>
            <p>{dream.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DreamList;