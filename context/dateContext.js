'use client';
import { createContext, useState, useContext } from 'react';

const dateContext = createContext();

export const DateProvider = ({ children }) => {
  const [dateStore, setDateStore] = useState({
    type: 'None',
    interval: 1,
    daysOfWeek: ['Mon', 'Sun'],
    nthDay: [],
    startDate: new Date(),
    endDate: new Date(2035, 8, 27),
    customSelection: 'general',
  });

  return (
    <dateContext.Provider value={{ dateStore, setDateStore }}>
      {children}
    </dateContext.Provider>
  );
};

export const useDate = () => useContext(dateContext);
