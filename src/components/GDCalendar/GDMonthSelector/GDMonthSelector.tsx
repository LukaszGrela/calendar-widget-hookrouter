import './GDMonthSelector.scss';
import { memo, useCallback, type FC } from 'react';
import {
  useGDCalendarActionsContext,
  useGDCalendarContext,
} from '../context/GDCalendarContext';

export const GDMonthSelector: FC = () => {
  const actions = useGDCalendarActionsContext();
  const { currentMonth, monthList } = useGDCalendarContext();

  const handleChange: React.ChangeEventHandler<
    HTMLSelectElement,
    HTMLSelectElement
  > = useCallback(
    (e) => {
      actions?.setMonth(parseInt(e.target.value));
    },
    [actions]
  );
  return (
    <select
      className="GDMonthSelector month-selector"
      name="month-selector"
      onChange={handleChange}
      value={currentMonth.getMonth()}
    >
      <Options monthsList={monthList} />
    </select>
  );
};

const Options: FC<{ monthsList: string[] }> = memo(function Options({
  monthsList,
}) {
  return monthsList.map((month, index) => (
    <option key={index} value={index}>
      {month}
    </option>
  ));
});
