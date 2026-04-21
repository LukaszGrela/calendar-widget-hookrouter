import './GDMonthNavigation.scss';
import type { FC } from 'react';
import { useGDCalendarContext } from '../context/GDCalendarContext';
import SVGIcon from '../SVGIcon';

export const GDMonthNavigation: FC = () => {
  const { prevMonth, nextMonth } = useGDCalendarContext();
  return (
    <div className="GDMonthNavigation">
      <button
        title="Previous month"
        className="GDCalendar_PrevMonth-btn"
        onClick={prevMonth}
      >
        <SVGIcon icon="up-arrow" viewBox="0 8 48 48"/>
      </button>
      <button
        title="Next month"
        className="GDCalendar_NextMonth-btn"
        onClick={nextMonth}
      >
        <SVGIcon icon="down-arrow" viewBox='16 8 48 48'/>
      </button>
    </div>
  );
};
