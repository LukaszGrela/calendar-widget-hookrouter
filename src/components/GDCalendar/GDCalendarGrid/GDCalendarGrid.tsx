import {
  useGDCalendarSelectionActionContext,
  useGDCalendarSelectionContext,
} from '../context/GDCalendarSelectionContext';
import { useGDCalendarContext } from '../context/GDCalendarContext';
import { GDCalendarMonthGrid } from '../GDCalendarMonthGrid';

export const GDCalendarGrid = () => {
  const { today, weeks } = useGDCalendarContext();

  const selectionActions = useGDCalendarSelectionActionContext();
  const selectionContext = useGDCalendarSelectionContext();
  return (
    <GDCalendarMonthGrid
      selection={selectionContext?.selection}
      weeks={weeks}
      now={today}
      onClick={selectionActions?.selectDate}
    />
  );
};
