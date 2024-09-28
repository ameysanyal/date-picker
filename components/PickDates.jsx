'use client';
import Preview from './Preview.jsx';
import Repeat from './Repeat.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDate } from '../context/dateContext';
import CustomDate from './CustomDate.jsx';

const PickDates = () => {
  const { dateStore, setDateStore } = useDate();
  const { startDate, endDate, interval, type, daysOfWeek, nthDay } = dateStore;

  const handleStartDateChange = (date) => {
    console.log(`react calendar output value ${date}`);
    setDateStore({ ...dateStore, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setDateStore({ ...dateStore, endDate: date });
  };
  return (
    <div className="flex flex-col justify-center items-center mx-auto h-5/6 w-1/2 p-2 border rounded-lg shadow-md gap-y-4 bg-indigo-200">
      <Preview />
      <div className="flex mx-20 gap-x-4">
        <div>
          <label>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            className="border rounded p-1 w-32"
          />
        </div>
        <div>
          <label>End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            className="border rounded p-1 w-32"
            isClearable
          />
        </div>
      </div>
      <p>
        Recurring Pattern: {type} Every: {interval}
        {(() => {
          if (type === 'Weekly') {
            return ` On: ${daysOfWeek}`;
          } else if (type === 'Monthly' || type === 'Yearly') {
            let s = new Set(nthDay.map((d) => `${d.getDate()}th`));
            return ` On: ${Array.from(s)}`;
          }
        })()}
      </p>
      <Repeat />
      <CustomDate />
    </div>
  );
};

export default PickDates;
