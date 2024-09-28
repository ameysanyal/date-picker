'use client';

import React, { useState } from 'react';
import { useDate } from '../context/dateContext';
import Weekdays from './Weekdays.jsx';
import Monthdays from './Monthdays';
const CustomDate = () => {
  const { dateStore, setDateStore } = useDate();
  const { startDate, endDate, interval, type, daysOfWeek, nthDay } = dateStore;
  const [selectWeek, setSelectWeek] = useState(false);
  const [selectMonth, setSelectMonth] = useState(false);

  const handleApply = (e) => {
    setDateStore({
      ...dateStore,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'type' && e.target.value === 'Weekly')
      setSelectWeek(true);
    else if (e.target.name === 'type' && e.target.value === 'Monthly')
      setSelectMonth(true);
  };

  return (
    <>
      <div className="flex gap-2 relative">
        <h1 className="absolute -left-2/3">Custom Selecton:</h1>
        <div>
          <label>Every: </label>
          <input
            className="p-1"
            type="number"
            value={interval}
            onChange={handleApply}
            name="interval"
            min={1}
            max={31}
          />
        </div>
        <div>
          <select
            value={type}
            onChange={handleApply}
            name="type"
            className="border rounded px-2 py-1"
          >
            <option value="None">None</option>
            <option value="Daily">Day</option>
            <option value="Weekly">Week</option>
            <option value="Monthly">Month</option>
            <option value="Yearly">Year</option>
          </select>
        </div>
      </div>
      {selectWeek && (
        <Weekdays
          onClose={() => {
            setSelectWeek(false);
          }}
        />
      )}
      {selectMonth && (
        <Monthdays
          onClose={() => {
            setSelectMonth(false);
          }}
        />
      )}
    </>
  );
};

export default CustomDate;
