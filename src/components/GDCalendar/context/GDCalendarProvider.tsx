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
import { getYearList, monthNames, weekDays } from '../utils';
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
  // className,
}) => {
  const [today, setToday] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(date);

  useEffect(() => {
    setToday(date);
  }, [date, setToday]);

  const yearList = useMemo(
    () => getYearList(today.getFullYear(), yearSpan),
    [today, yearSpan]
  );

  const setMonth = useCallback(
    (monthDate: Date) => {
      setCurrentDate((prevDate) => {
        const date = new Date(prevDate);

        date.setMonth(monthDate.getMonth());

        onDateChanged?.(date);
        return date;
      });
    },
    [onDateChanged]
  );

  const setYear = useCallback(
    (yearDate: Date) => {
      console.log('GDCalendarProvider.setYear', yearDate);
      setCurrentDate((prevDate) => {
        const date = new Date(prevDate);

        date.setFullYear(yearDate.getFullYear());

        onDateChanged?.(date);
        return date;
      });
    },
    [onDateChanged]
  );

  const nextDay = useCallback(() => {
    // setToday((prevState) => {});
    // onDateChanged?.();
  }, []);
  const nextMonth = useCallback(() => {
    setCurrentDate((prevDate) => {
      const date = new Date(prevDate);

      date.setMonth(date.getMonth() + 1);

      onDateChanged?.(date);
      return date;
    });
  }, [onDateChanged]);
  const nextYear = useCallback(() => {
    // onDateChanged?.();
  }, []);
  const prevDay = useCallback(() => {
    // onDateChanged?.();
  }, []);
  const prevMonth = useCallback(() => {
    setCurrentDate((prevDate) => {
      const date = new Date(prevDate);

      date.setDate(0); // will set to last day of previous month
      date.setDate(1); // set it to the first day of that month

      onDateChanged?.(date);
      return date;
    });
  }, [onDateChanged]);
  const prevYear = useCallback(() => {
    // onDateChanged?.();
  }, []);
  const selectDate = useCallback((date?: Date) => {
    onDateSelected?.(date);
  }, []);

  const weekdays = weekDays(formatWeekDays);
  const monthList = monthNames(formatMonthDays);

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
      setToday,
      setMonth,
      setYear,
      monthList,
      yearSpan,
      yearList,
      selectedDate,
      selectDate,
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
    ]
  );
  return (
    <GDCalendarContext.Provider value={state}>
      {children}
    </GDCalendarContext.Provider>
  );
};
