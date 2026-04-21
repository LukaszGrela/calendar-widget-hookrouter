import './GDMonthSelector.scss'
import { useCallback, type FC } from 'react';
import { useGDCalendarContext } from '../context/GDCalendarContext';

export const GDMonthSelector: FC = () => {
    const { currentMonth, monthList, setMonth } = useGDCalendarContext();
  
    const handleChange: React.ChangeEventHandler<
      HTMLSelectElement,
      HTMLSelectElement
    > = useCallback(
      (e) => {
        const date = new Date(currentMonth);
        date.setMonth(parseInt(e.target.value));
        setMonth(date);
      },
      [currentMonth, setMonth]
    );
  return (
    <select
      className="GDMonthSelector month-selector"
      name="month-selector"
      onChange={handleChange}
      value={currentMonth.getMonth()}
    >
      {monthList.map((month, index) => (
        <option key={index} value={index}>
          {month}
        </option>
      ))}
    </select>
  );
};
