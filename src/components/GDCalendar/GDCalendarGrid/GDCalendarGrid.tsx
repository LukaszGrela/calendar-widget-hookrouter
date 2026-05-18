import { useMemo, type FC } from 'react';
import {
  useGDCalendarSelectionActionContext,
  useGDCalendarSelectionContext,
} from '../context/GDCalendarSelectionContext';
import { useGDCalendarContext } from '../context/GDCalendarContext';
import { GDCalendarMonthGrid } from '../GDCalendarMonthGrid';
import { AnimatedContainer } from '../AnimatedContainer';

export const GDCalendarGrid: FC<{ animate?: boolean }> = ({ animate }) => {
  const { today, weeks, mondayFirst, workingWeek } = useGDCalendarContext();

  const selectionActions = useGDCalendarSelectionActionContext();
  const selectionContext = useGDCalendarSelectionContext();

  const monthGridElement = useMemo(
    () => (
      <GDCalendarMonthGrid
        selection={selectionContext?.selection}
        weeks={weeks}
        now={today}
        onClick={selectionActions?.selectDate}
        workingWeek={workingWeek}
        mondayFirst={mondayFirst}
      />
    ),
    [
      mondayFirst,
      selectionActions?.selectDate,
      selectionContext?.selection,
      today,
      weeks,
      workingWeek,
    ]
  );

  return animate ? (
    <AnimatedContainer transitionClassNames={'month'}>
      {monthGridElement}
    </AnimatedContainer>
  ) : (
    monthGridElement
  );
};
