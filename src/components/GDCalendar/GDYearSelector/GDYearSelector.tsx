import './GDYearSelector.scss';
import { memo, useCallback, type FC } from 'react';
import {
  useGDCalendarActionsContext,
  useGDCalendarContext,
} from '../context/GDCalendarContext';

export const GDYearSelector = () => {
  const actions = useGDCalendarActionsContext();
  const { currentMonth, yearList } = useGDCalendarContext();

  const handleChange: React.ChangeEventHandler<
    HTMLSelectElement,
    HTMLSelectElement
  > = useCallback(
    (e) => {
      actions?.setYear(parseInt(e.target.value));
    },
    [actions]
  );

  return (
    <select
      className="GDYearSelector year-selector"
      name="year-selector"
      onChange={handleChange}
      value={currentMonth.getFullYear()}
    >
      <Options yearsList={yearList} />
    </select>
  );
};

const Options: FC<{ yearsList: number[] }> = memo(function Options({
  yearsList,
}) {
  return yearsList.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));
});
