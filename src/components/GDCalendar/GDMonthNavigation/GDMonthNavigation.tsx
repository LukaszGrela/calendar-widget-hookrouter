import './GDMonthNavigation.scss';
import type { FC } from 'react';
import { useGDCalendarActionsContext } from '../context/GDCalendarContext';
import SVGIcon from '../SVGIcon';

export const GDMonthNavigation: FC = () => {
  const actions = useGDCalendarActionsContext();
  return (
    <div className="GDMonthNavigation">
      <button
        title="Previous month"
        className="GDCalendar_PrevMonth-btn"
        onClick={actions?.prevMonth}
      >
        <SVGIcon icon="up-arrow" viewBox="0 8 48 48" />
      </button>
      <button
        title="Next month"
        className="GDCalendar_NextMonth-btn"
        onClick={actions?.nextMonth}
      >
        <SVGIcon icon="down-arrow" viewBox="16 8 48 48" />
      </button>
    </div>
  );
};
