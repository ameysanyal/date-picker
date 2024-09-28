'use client';
import { useDate } from '@/context/dateContext';
const Repeat = () => {
  const { dateStore, setDateStore } = useDate();
  console.log(dateStore);
  const handleDateChange = (e) => {
    setDateStore({ ...dateStore, type: e.target.value });
  };
  return (
    <div>
      <label>Recurrence Type: </label>
      <select
        value={dateStore.type}
        onChange={handleDateChange}
        className="border rounded px-2 py-1"
      >
        <option value="None">None</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
    </div>
  );
};

export default Repeat;
