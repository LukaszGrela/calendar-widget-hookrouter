import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import {
  CalendarSelectionActionContext,
  CalendarSelectionContext,
} from './CalendarSelectionContext';
import type { IProps, TDateData, TRangeSelection } from '../types';
import { normalizeSelection } from '../utils/date/normalizeSelection';
import type {
  TCalendarSelectionActionContext,
  TCalendarSelectionContext,
} from './types';
import {
  dateEarlierThan,
  dateLaterThan,
  datesSame,
  dateWithinRange,
  startOfDay,
} from '../utils';

export const CalendarSelectionProvider: FC<
  Pick<IProps, 'onDateSelected' | 'selection'> & { children: ReactNode }
> = ({ children, onDateSelected, selection: incomingSelection }) => {
  const [selection, setSelection] = useState(() =>
    normalizeSelection(incomingSelection)
  );
  useEffect(() => {
    setSelection(normalizeSelection(incomingSelection));
  }, [incomingSelection]);

  const selectDate = useCallback(
    (args?: TDateData) => {
      // if (args && !datesSame(args.date, currentDate, 'month')) {
      //   // navigate to this dates month
      //   setCurrentDate(args.date);
      //   onDateChanged?.(args.date);
      // }
      if (selection && !(selection instanceof Date)) {
        const copy = selection.concat() as TRangeSelection;
        const currentDate = args?.date ? startOfDay(args.date) : null;
        if (copy[0] == null) {
          // [null, null]
          copy[0] = currentDate;
        } else if (copy[1] == null) {
          // [Date, null]
          if (currentDate == null) {
            copy[0] = null;
          } else if (datesSame(currentDate, copy[0], 'date')) {
            copy[0] = null;
          } else if (dateLaterThan(currentDate, copy[0])) {
            copy[1] = currentDate;
          } else if (currentDate < copy[0]) {
            /* swap */
            copy[1] = copy[0];
            copy[0] = currentDate;
          }
        } else {
          // [Date, Date]
          if (currentDate == null) {
            copy[1] = null;
          } else if (
            // dateWithinRange(currentDate, copy) &&
            datesSame(currentDate, copy[1], 'date')
          ) {
            // reselected right edge, set to first and nullify second
            copy[0] = currentDate;
            copy[1] = null;
          } else if (datesSame(currentDate, copy[0], 'date')) {
            // reselected left edge, remove range selection
            copy[0] = null;
            copy[1] = null;
          } else if (dateEarlierThan(currentDate, copy[0])) {
            // expand selection to left
            copy[0] = currentDate;
          } else if (dateLaterThan(currentDate, copy[1])) {
            // expand selection to right
            copy[1] = currentDate;
          } else if (dateWithinRange(currentDate, copy)) {
            // narrow selection
            copy[1] = currentDate;
          }
        }
        onDateSelected?.(copy);
      } else {
        onDateSelected?.(args?.date);
      }
    },
    [onDateSelected, selection]
  );

  const selectionContext = useMemo(
    (): TCalendarSelectionContext => ({
      selection,
    }),
    [selection]
  );
  const actionContext = useMemo(
    (): TCalendarSelectionActionContext => ({
      selectDate,
    }),
    [selectDate]
  );

  return (
    <CalendarSelectionActionContext.Provider value={actionContext}>
      <CalendarSelectionContext.Provider value={selectionContext}>
        {children}
      </CalendarSelectionContext.Provider>
    </CalendarSelectionActionContext.Provider>
  );
};
