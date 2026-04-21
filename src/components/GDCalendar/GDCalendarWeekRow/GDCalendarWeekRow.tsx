import './GDCalendarWeekRow.scss';
import { useGDCalendarContext } from '../context/GDCalendarContext';
import GDCalendarRow from '../GDCalendarRow';

export const GDCalendarWeekRow = () => {
  const { weekdays } = useGDCalendarContext();
  return <GDCalendarRow className="GDCalendar_WeekHeader" days={weekdays} />;
};
