'use client';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDate } from '../context/dateContext';
import {
  eachDayOfInterval,
  format,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

const Preview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { dateStore, setDateStore } = useDate();
  const {
    startDate,
    endDate,
    interval,
    type,
    daysOfWeek,
    nthDay,
    customSelection,
  } = dateStore;
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    if (type !== 'Monthly') {
      setDateStore({ ...dateStore, nthDay: [], customSelection: 'general' });
    }
  }, [type]);

  const handleDateChange = (date) => {
    let day = weekday[date.getDay()];
    setSelectedDate(date);
    setDateStore({
      ...dateStore,
      nthDay: [date],
      daysOfWeek: [day],
    });
  };

  const generateDates = () => {
    console.log(` mode ${customSelection}`);
    if (!startDate) return [];

    const rangeEnd = endDate || new Date(startDate.getFullYear() + 10, 11, 31);
    const allDates = eachDayOfInterval({ start: startDate, end: rangeEnd });

    return allDates.filter((date, index) => {
      if (type === 'Daily') return index % interval === 0;
      if (type === 'Weekly') {
        let totalWeeksPassed = Math.floor(index / 7);
        return (
          totalWeeksPassed % interval === 0 &&
          daysOfWeek.includes(format(date, 'EEE'))
        );
      }

      if (type === 'Monthly') {
        // let totalMonths = Math.round(index / 30);
        const totalMonthsPassed = differenceInMonths(date, startDate);
        let nthDaylist1 = nthDay.map((d) => d.getDate().toString());
        let nthDaylist2 = nthDay.map(
          (d) => `${d.getDate()}/${d.getDay()}/${d.getMonth() + 1}`
        );
        return (
          totalMonthsPassed % interval === 0 &&
          (customSelection === 'finetune'
            ? nthDaylist2.includes(format(date, 'd/i/M'))
            : nthDaylist1.includes(format(date, 'd')))
        );
      }
      if (type === 'Yearly') {
        // let totalYears = Math.round(index / 365);
        const totalYearsPassed = differenceInYears(date, startDate);
        let nthDaylist = nthDay.map(
          (d) => `${d.getDate()}/${d.getMonth() + 1}`
        );

        return (
          totalYearsPassed % interval === 0 &&
          nthDaylist.includes(format(date, 'd/M'))
        );
      }
    });
  };

  const isHighlighted = (date) => {
    return generateDates().some(
      (highlightedDate) =>
        date.getFullYear() === highlightedDate.getFullYear() &&
        date.getMonth() === highlightedDate.getMonth() &&
        date.getDate() === highlightedDate.getDate()
    );
  };

  return (
    <>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          if (view === 'month' && isHighlighted(date)) {
            return 'highlight';
          }
        }}
      />
    </>
  );
};

export default Preview;
