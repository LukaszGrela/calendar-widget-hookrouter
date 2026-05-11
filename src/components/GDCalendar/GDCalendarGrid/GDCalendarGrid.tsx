import { useGDCalendarContext } from '../context/GDCalendarContext';
import { GDCalendarMonthGrid } from '../GDCalendarMonthGrid';
import type { TDateData } from '../types';

export const GDCalendarGrid = () => {
  const { today, selection, selectDate, weeks } = useGDCalendarContext();
  return (
    <GDCalendarMonthGrid
      selection={selection}
      weeks={weeks}
      now={today}
      onClick={(date: TDateData): void => {
        selectDate(date);
      }}
    />
  );
};
