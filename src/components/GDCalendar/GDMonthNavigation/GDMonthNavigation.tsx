import './GDMonthNavigation.scss';
import type { FC } from 'react';
import { useGDCalendarActionsContext } from '../context/GDCalendarContext';
import { IconUp } from '../icons/IconUp';
import { IconDown } from '../icons/IconDown';

export const GDMonthNavigationConnected: FC = () => {
  const actions = useGDCalendarActionsContext();
  return (
    <div className="GDMonthNavigation">
      <button
        title="Previous month"
        className="GDCalendar_PrevMonth-btn"
        onClick={actions?.prevMonth}
      >
        <IconUp />
      </button>
      <button
        title="Next month"
        className="GDCalendar_NextMonth-btn"
        onClick={actions?.nextMonth}
      >
        <IconDown />
      </button>
    </div>
  );
};
