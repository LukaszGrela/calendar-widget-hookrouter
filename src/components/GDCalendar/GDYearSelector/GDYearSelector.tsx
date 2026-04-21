import './GDYearSelector.scss';
import { useCallback } from 'react';
import { useGDCalendarContext } from '../context/GDCalendarContext';

export const GDYearSelector = () => {
  const { currentMonth, setYear, yearList } = useGDCalendarContext();

  const handleChange: React.ChangeEventHandler<
    HTMLSelectElement,
    HTMLSelectElement
  > = useCallback(
    (e) => {
      console.log('GDYearSelector', e.target.value, currentMonth.getFullYear());
      const date = new Date(currentMonth);
      date.setFullYear(parseInt(e.target.value));
      console.log('GDYearSelector', date.getFullYear());
      setYear(date);
    },
    [currentMonth, setYear]
  );

  return (
    <select
      className="GDYearSelector year-selector"
      name="year-selector"
      onChange={handleChange}
      value={currentMonth.getFullYear()}
    >
      {yearList.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};
