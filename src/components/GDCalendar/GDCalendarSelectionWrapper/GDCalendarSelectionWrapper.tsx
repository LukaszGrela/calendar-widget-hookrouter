import { useCallback, type FC, type ReactNode } from 'react';
import type { IProps, TRangeSelection } from '../types';
import {
  useGDCalendarContext,
  useGDCalendarActionsContext,
} from '../context/GDCalendarContext';
import { GDCalendarSelectionProvider } from '../context/GDCalendarSelectionProvider';
import { datesSame } from '../utils';

export const GDCalendarSelectionWrapper: FC<
  Pick<IProps, 'onDateSelected' | 'selection' | 'onDateChanged'> & {
    children: ReactNode;
  }
> = ({ children, selection, onDateSelected, onDateChanged }) => {
  const { isControlled, currentMonth } = useGDCalendarContext();
  const actions = useGDCalendarActionsContext();

  const selectionHandler = useCallback(
    (arg?: Date | TRangeSelection | null) => {
      if (
        arg &&
        arg instanceof Date &&
        !datesSame(arg, currentMonth, 'month')
      ) {
        if (!isControlled) {
          // navigate to this dates month
          actions?.setDisplayedMonth(arg);
        } else {
          onDateChanged?.(arg);
        }
      }

      onDateSelected?.(arg);
    },
    [actions, currentMonth, isControlled, onDateChanged, onDateSelected]
  );

  return (
    <GDCalendarSelectionProvider
      selection={selection}
      onDateSelected={selectionHandler}
    >
      {children}
    </GDCalendarSelectionProvider>
  );
};
