import { useDate } from '../context/dateContext';

const Weekdays = ({ onClose }) => {
  const { dateStore, setDateStore } = useDate();

  const handleDaysOfWeekChange = (day) => {
    let updatedDays = [...dateStore.daysOfWeek];
    if (updatedDays.includes(day)) {
      updatedDays = updatedDays.filter((d) => d !== day);
    } else {
      updatedDays.push(day);
    }
    setDateStore({ ...dateStore, daysOfWeek: updatedDays });
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
        <div className="mx-auto">
          <label>Select Days of the Week</label>
          <div className="flex gap-2 p-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <button
                key={day}
                onClick={() => handleDaysOfWeekChange(day)}
                className={`border p-2 ${
                  dateStore.daysOfWeek.includes(day) ? 'bg-blue-500' : ''
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weekdays;
