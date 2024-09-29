import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

    const fetchDreams = async (query = '') => {
      try {
        const url = query
          ? `https://dreamcatcher-backend-8a5111414779.herokuapp.com/api/dreams/search/?q=${query}`
          : 'https://dreamcatcher-backend-8a5111414779.herokuapp.com/api/dreams/';

        const response = await axios.get(url);
        setDreams(response.data);
      } catch (error) {
        console.error('Error fetching dreams:', error);
      }
    };

    const deleteDream = async (id) => {
      try {
        await axios.delete(`https://dreamcatcher-backend-8a5111414779.herokuapp.com/api/dreams/${id}/`);
        setDreams(dreams.filter((dream) => dream.id !== id)); 
      } catch (error) {
        console.error('Error deleting dream:', error);
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
        {dreams.length > 0 ? (
          dreams.map((dream) => (
            <li key={dream.id} className="mb-4">
              <h3 className="text-xl font-semibold">{dream.title}</h3>
              <p>{dream.description}</p>
              {/* Delete Button */}
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => deleteDream(dream.id)}  // Call deleteDream on click
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