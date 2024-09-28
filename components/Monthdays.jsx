import React, { useState, useEffect } from 'react';
import { useDate } from '../context/dateContext';
import {
  eachDayOfInterval,
  format,
  setDate,
  getDay,
  getDaysInMonth,
  eachMonthOfInterval,
} from 'date-fns';

const Monthdays = ({ onClose }) => {
  const { dateStore, setDateStore } = useDate();
  const { startDate, endDate, interval, type, daysOfWeek, nthDay } = dateStore;
  const [modeSelect, setModeSelect] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  const [recurrence, setRecurrence] = useState({
    occurrence: 0,
    weekday: 0,
  });

  let dateArray = [];
  for (let i = 1; i <= 31; i++) {
    dateArray.push(i);
  }

  useEffect(() => {
    if (nthDay) {
      setSelectedDays(nthDay.map((d) => d.getDate()));
    }
  }, [nthDay]);

  const handleModeSelect = (isEachMode) => {
    setModeSelect(isEachMode);
    setDateStore({
      ...dateStore,
      customSelection: isEachMode ? 'general' : 'finetune',
    });
  };

  const handleDaysofMonthChange = (day) => {
    let updatedDays;

    // Check if the day is already selected, and update accordingly
    if (selectedDays.includes(day)) {
      updatedDays = selectedDays.filter((d) => d !== day);
    } else {
      updatedDays = [...selectedDays, day];
    }
    console.log(updatedDays);
    // Update the state with the newly selected days
    setSelectedDays(updatedDays);

    // Generate array of months between startDate and endDate
    const monthsArray = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    // Use the updatedDays to filter dates
    const updatedDates = monthsArray.filter((d) => {
      return updatedDays.includes(parseInt(format(d, 'd')));
    });
    console.log(updatedDates);
    // Update the dateStore with the selected dates
    setDateStore({ ...dateStore, nthDay: updatedDates });
  };

  // Handle selecting "First Tuesday" type recurrence
  const handleRecurrenceChange = (e) => {
    const { name, value } = e.target;
    setRecurrence({ ...recurrence, [name]: value });
  };

  // Generate dates for "First Tuesday"-like recurrence
  const handleApplyRecurrence = () => {
    setDateStore({ ...dateStore, dayorWeek: modeSelect });

    const { occurrence, weekday } = recurrence;

    const monthsArray = eachMonthOfInterval({
      start: startDate,
      end: endDate,
    });

    const updatedDates = monthsArray.map((monthDate) => {
      const daysInMonth = getDaysInMonth(monthDate);
      let count = 0;

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDay = setDate(monthDate, day);
        if (getDay(currentDay) === parseInt(weekday)) {
          if (count === parseInt(occurrence)) {
            return currentDay;
          }
          count++;
        }
      }
      return null;
    });

    const validDates = updatedDates.filter(Boolean);

    console.log(validDates);
    setDateStore({ ...dateStore, nthDay: validDates });
    onClose(); // Close modal after applying recurrence
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex flex-col justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col rounded-md p-2 relative w-1/3"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1> Select Days in the Month</h1>
        <div className="flex p-2 gap-2">
          <button
            className="px-2 py-1 bg-indigo-500 rounded-lg hover:bg-indigo-700 text-white"
            onClick={() => handleModeSelect(true)}
          >
            Each
          </button>
          <button
            className="px-2 py-1 bg-indigo-500 rounded-lg hover:bg-indigo-700 text-white"
            onClick={() => handleModeSelect(false)}
          >
            On the
          </button>
        </div>

        <div className="mx-auto">
          {modeSelect ? (
            <div className="grid grid-cols-7 gap-2 p-2 m-1">
              {dateArray.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDaysofMonthChange(day)}
                  className={`border rounded-xl p-2 ${
                    selectedDays.includes(day) ? 'bg-blue-500' : ''
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div>
                <label>On Each: </label>
                <select
                  name="occurrence"
                  value={recurrence.occurrence}
                  onChange={handleRecurrenceChange}
                  className="border rounded px-2 py-1"
                >
                  <option value={0}>First</option>
                  <option value={1}>Second</option>
                  <option value={2}>Third</option>
                  <option value={3}>Fourth</option>
                  <option value={4}>Fifth</option>
                </select>
                <select
                  name="weekday"
                  value={recurrence.weekday}
                  onChange={handleRecurrenceChange}
                  className="border rounded px-2 py-1"
                >
                  <option value={0}>Sun</option>
                  <option value={1}>Mon</option>
                  <option value={2}>Tue</option>
                  <option value={3}>Wed</option>
                  <option value={4}>Thu</option>
                  <option value={5}>Fri</option>
                  <option value={6}>Sat</option>
                </select>
              </div>
              <button
                onClick={handleApplyRecurrence}
                className="px-2 py-1 bg-indigo-500 rounded-lg hover:bg-indigo-700 text-white"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Monthdays;
