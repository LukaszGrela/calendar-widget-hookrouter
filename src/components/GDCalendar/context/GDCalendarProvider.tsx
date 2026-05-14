import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { GDCalendarContext } from './GDCalendarContext';
import type { TCalendarContext } from './types';
import {
  calendarDates,
  datesSame,
  getYearList,
  monthNames,
  weekDays,
  useToday,
  add,
  clone,
  dateWithinRange,
  dateLaterThan,
  startOfDay,
  dateEarlierThan,
} from '../utils';
import type { IProps, TDateData, TRangeSelection } from '../types';
import { normalizeSelection } from '../utils/date/normalizeSelection';

export const GDCalendarProvider: FC<IProps & { children: ReactNode }> = ({
  children,
  onDateChanged,
  selection: incomingSelection,
  date = new Date(),
  yearSpan = 100,
  formatWeekDays = 'short',
  formatMonthDays = 'short',
  onDateSelected,
  mondayFirst = false,
  locale,
  // className,
}) => {
  const today = useToday();

  const [currentDate, setCurrentDate] = useState(date);
  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  const [selection, setSelection] = useState(() =>
    normalizeSelection(incomingSelection)
  );
  useEffect(() => {
    setSelection(normalizeSelection(incomingSelection));
  }, [incomingSelection]);

  console.log(selection);

  const yearList = useMemo(
    () => getYearList(today.getFullYear(), yearSpan),
    [today, yearSpan]
  );

  const setMonth = useCallback(
    (monthDate: Date) => {
      const newDate = clone(currentDate);
      newDate.setMonth(monthDate.getMonth());
      setCurrentDate(newDate);
      onDateChanged?.(newDate);
    },
    [onDateChanged, currentDate]
  );

  const setYear = useCallback(
    (yearDate: Date) => {
      console.log('GDCalendarProvider.setYear', yearDate);
      const newDate = clone(currentDate);

      newDate.setFullYear(yearDate.getFullYear());
      setCurrentDate(newDate);

      onDateChanged?.(newDate);
    },
    [currentDate, onDateChanged]
  );

  const nextDay = useCallback(() => {
    // setToday((prevState) => {});
    // onDateChanged?.();
  }, []);

  const nextMonth = useCallback(() => {
    const newDate = add(currentDate, 1, 'month');
    setCurrentDate(newDate);
    onDateChanged?.(newDate);
  }, [currentDate, onDateChanged]);

  const nextYear = useCallback(() => {
    // onDateChanged?.();
  }, []);
  const prevDay = useCallback(() => {
    // onDateChanged?.();
  }, []);
  const prevMonth = useCallback(() => {
    const newDate = clone(currentDate);
    newDate.setDate(0); // will set to last day of previous month
    newDate.setDate(1); // set it to the first day of that month

    setCurrentDate(newDate);
    onDateChanged?.(newDate);
  }, [currentDate, onDateChanged]);
  const prevYear = useCallback(() => {
    // onDateChanged?.();
  }, []);

  const selectDate = useCallback(
    (args?: TDateData) => {
      if (args && !datesSame(args.date, currentDate, 'month')) {
        // navigate to this dates month
        setCurrentDate(args.date);
        onDateChanged?.(args.date);
      }
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
    [currentDate, onDateChanged, onDateSelected, selection]
  );

  const weekdays = weekDays(formatWeekDays, locale, mondayFirst);
  const monthList = monthNames(formatMonthDays, locale);
  const weeks = calendarDates(currentDate, mondayFirst);

  const state: TCalendarContext = useMemo(
    () => ({
      nextDay,
      nextMonth,
      nextYear,
      prevDay,
      prevMonth,
      prevYear,
      today,
      weekdays,
      currentMonth: currentDate,
      setMonth,
      setYear,
      monthList,
      yearSpan,
      yearList,
      selection,
      selectDate,
      mondayFirst,
      locale,
      weeks,
    }),
    [
      nextDay,
      nextMonth,
      nextYear,
      prevDay,
      prevMonth,
      prevYear,
      today,
      weekdays,
      currentDate,
      setMonth,
      setYear,
      monthList,
      yearSpan,
      yearList,
      selection,
      selectDate,
      mondayFirst,
      locale,
      weeks,
    ]
  );
  return (
    <GDCalendarContext.Provider value={state}>
      {children}
    </GDCalendarContext.Provider>
  );
};
