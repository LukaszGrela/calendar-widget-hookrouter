import { useCallback, useMemo, type FC, type ReactNode } from 'react';
import {
  GDCalendarActionsContext,
  GDCalendarContext,
} from './GDCalendarContext';
import type { TCalendarActionsContext, TCalendarContext } from './types';
import {
  calendarDates,
  getYearList,
  monthNames,
  weekDays,
  useToday,
  add,
  clone,
  subtract,
  startOfDay,
} from '../utils';
import type { IProps } from '../types';
import { useControlled } from '../utils/useControlled';

export const GDCalendarProvider: FC<IProps & { children: ReactNode }> = ({
  children,
  onDateChanged: controlledOnDateChanged,
  date: controlledDate,
  yearSpan = 100,
  formatWeekDays = 'short',
  formatMonthDays = 'short',
  mondayFirst = false,
  locale,
  // className,
}) => {
  const today = useToday();

  const {
    value: currentDate,
    onChange: onDateChanged,
    isControlled,
  } = useControlled(controlledDate, controlledOnDateChanged, new Date());

  const yearList = useMemo(
    () => getYearList(today.getFullYear(), yearSpan),
    [today, yearSpan]
  );

  const setMonth = useCallback(
    (month: number) => {
      const newDate = clone(currentDate);

      newDate.setMonth(Math.max(0, Math.min(month, 11)));

      onDateChanged(newDate);
    },
    [onDateChanged, currentDate]
  );

  const setYear = useCallback(
    (year: number) => {
      console.log('GDCalendarProvider.setYear', year);
      const newDate = clone(currentDate);

      newDate.setFullYear(year);

      onDateChanged(newDate);
    },
    [currentDate, onDateChanged]
  );

  const nextDay = useCallback(() => {
    // setToday((prevState) => {});
    // onDateChanged();
  }, []);

  const nextMonth = useCallback(() => {
    const newDate = add(currentDate, 1, 'month');

    onDateChanged(newDate);
  }, [currentDate, onDateChanged]);

  const nextYear = useCallback(() => {
    const newDate = add(currentDate, 1, 'year');

    onDateChanged(newDate);
  }, [currentDate, onDateChanged]);

  const prevDay = useCallback(() => {
    // onDateChanged();
  }, []);

  const prevMonth = useCallback(() => {
    const newDate = subtract(currentDate, 1, 'month');

    onDateChanged(newDate);
  }, [currentDate, onDateChanged]);

  const prevYear = useCallback(() => {
    const newDate = subtract(currentDate, 1, 'year');

    onDateChanged(newDate);
  }, [currentDate, onDateChanged]);

  const setDisplayedMonth = useCallback(
    (newDate: Date) => {
      const date = startOfDay(newDate);

      onDateChanged(date);
    },
    [onDateChanged]
  );

  const setToday = useCallback(() => {
    const date = startOfDay(today);

    onDateChanged(date);
  }, [onDateChanged, today]);

  const weekdays = weekDays(formatWeekDays, locale, mondayFirst);
  const monthList = monthNames(formatMonthDays, locale);
  const weeks = calendarDates(currentDate, mondayFirst);

  const state = useMemo(
    (): TCalendarContext => ({
      today,
      weekdays,
      currentMonth: currentDate,
      monthList,
      yearSpan,
      yearList,
      mondayFirst,
      locale,
      weeks,
      isControlled,
    }),
    [
      today,
      weekdays,
      currentDate,
      monthList,
      yearSpan,
      yearList,
      mondayFirst,
      locale,
      weeks,
      isControlled,
    ]
  );
  const actions = useMemo(
    (): TCalendarActionsContext => ({
      nextDay,
      nextMonth,
      nextYear,
      prevDay,
      prevMonth,
      prevYear,
      setMonth,
      setYear,
      setDisplayedMonth,
      setToday,
    }),
    [
      nextDay,
      nextMonth,
      nextYear,
      prevDay,
      prevMonth,
      prevYear,
      setMonth,
      setYear,
      setDisplayedMonth,
      setToday,
    ]
  );
  return (
    <GDCalendarActionsContext.Provider value={actions}>
      <GDCalendarContext.Provider value={state}>
        {children}
      </GDCalendarContext.Provider>
    </GDCalendarActionsContext.Provider>
  );
};
