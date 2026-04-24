import { useGDCalendarContext } from '../context/GDCalendarContext';
import { GDCalendarMonthGrid } from '../GDCalendarMonthGrid';

export const GDCalendarGrid = () => {
  const { today, currentMonth, selectedDate, selectDate, weeks } =
    useGDCalendarContext();
  return (
    <GDCalendarMonthGrid
      date={selectedDate}
      monthDate={currentMonth}
      weeks={weeks}
      now={today}
      onClick={(date: string | Date): void => {
        if (date instanceof Date) {
          console.log('onDateClick', date);
          selectDate(date);
        }
      }}
    />
  );
};
