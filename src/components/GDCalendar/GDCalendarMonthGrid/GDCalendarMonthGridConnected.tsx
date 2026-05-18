import { useMemo, type FC } from 'react';
import {
  useGDCalendarSelectionActionContext,
  useGDCalendarSelectionContext,
} from '../context/GDCalendarSelectionContext';
import { useGDCalendarContext } from '../context/GDCalendarContext';
import GDCalendarMonthGrid from './GDCalendarMonthGrid';
import {
  AnimatedContainer,
  type IProps as IAnimatedContainerProps,
} from '../AnimatedContainer';

export const GDCalendarMonthGridConnected: FC<{
  animate?: boolean | Pick<IAnimatedContainerProps, 'appear' | 'timeout'>;
}> = ({ animate }) => {
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
    <AnimatedContainer
      transitionClassNames={'month'}
      {...(typeof animate === 'boolean' ? {} : animate)}
    >
      {monthGridElement}
    </AnimatedContainer>
  ) : (
    monthGridElement
  );
};
