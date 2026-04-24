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
      const date = add(prevDate, 1, 'months');

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
      const date = clone(prevDate);

      date.setDate(0); // will set to last day of previous month
      date.setDate(1); // set it to the first day of that month

      onDateChanged?.(date);
      return date;
    });
  }, [onDateChanged]);
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
