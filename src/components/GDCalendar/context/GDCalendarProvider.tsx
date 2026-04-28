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
} from '../utils';
import type { IProps } from '../types';

export const GDCalendarProvider: FC<IProps & { children: ReactNode }> = ({
  children,
  onDateChanged,
  selectedDate,
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
    (date?: Date) => {
      if (date && !datesSame(date, currentDate, 'month')) {
        // navigate to this date
        setCurrentDate(date);
        onDateChanged?.(date);
      }
      onDateSelected?.(date);
    },
    [currentDate, onDateChanged, onDateSelected]
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
      selectedDate,
      selectDate,
      mondayFirst,
      locale,
      weeks,
    }),
    [
      currentDate,
      monthList,
      nextDay,
      nextMonth,
      nextYear,
      prevDay,
      prevMonth,
      prevYear,
      setMonth,
      setYear,
      today,
      weekdays,
      yearSpan,
      yearList,
      selectedDate,
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
