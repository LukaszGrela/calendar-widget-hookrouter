import './GDCalendarWeekRow.scss';
import { useGDCalendarContext } from '../context/GDCalendarContext';
import { GDCalendarWeekDay } from '../GDCalendarDay';
import { classNames } from '../../../utils/classNames';

export const GDCalendarWeekRow = () => {
  const { weekdays, mondayFirst } = useGDCalendarContext();
  return (
    <div className="GDCalendar_WeekHeader GDCalendar_Row">
      {weekdays.map((day, index) => (
        <GDCalendarWeekDay
          key={day}
          className={classNames(
            `weekday-${index}`,
            !mondayFirst && index === 0 && 'weekend',
            mondayFirst && index === 5 && 'weekend',
            index === 6 && 'weekend'
          )}
          date={day}
        />
      ))}
    </div>
  );
};
