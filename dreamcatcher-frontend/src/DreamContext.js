import React, { createContext, useContext, useState } from 'react';

const DreamContext = createContext();

export function DreamProvider({ children }) {
  const [dreams, setDreams] = useState([]);
  const [expandedDreamId, setExpandedDreamId] = useState(null);

  const addDream = (newDream) => {
    setDreams(prevDreams => [newDream, ...prevDreams]);
    setExpandedDreamId(newDream.id);
  };

  return (
    <DreamContext.Provider value={{ dreams, setDreams, expandedDreamId, setExpandedDreamId, addDream }}>
      {children}
    </DreamContext.Provider>
  );
}

export function useDreamContext() {
  const context = useContext(DreamContext);
  if (!context) {
    throw new Error('useDreamContext must be used within a DreamProvider');
  }
  return context;
}