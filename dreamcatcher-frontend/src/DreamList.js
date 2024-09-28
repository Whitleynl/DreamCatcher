import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DreamList() {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const response = await axios.get('/api/dreams/');
        setDreams(response.data);
      } catch (error) {
        console.error('Error fetching dreams:', error);
      }
    };
    fetchDreams();
  }, []);

  return (
    <div className="p-8 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Dream List</h2>
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