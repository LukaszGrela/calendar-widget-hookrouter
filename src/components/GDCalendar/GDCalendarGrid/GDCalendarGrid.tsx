import {
  useCalendarSelectionActionContext,
  useCalendarSelectionContext,
} from '../context/CalendarSelectionContext';
import { useGDCalendarContext } from '../context/GDCalendarContext';
import { GDCalendarMonthGrid } from '../GDCalendarMonthGrid';

export const GDCalendarGrid = () => {
  const { today, weeks } = useGDCalendarContext();
  const selectionActions = useCalendarSelectionActionContext();
  const selectionContext = useCalendarSelectionContext();
  return (
    <GDCalendarMonthGrid
      selection={selectionContext?.selection}
      weeks={weeks}
      now={today}
      onClick={selectionActions?.selectDate}
    />
  );
};
