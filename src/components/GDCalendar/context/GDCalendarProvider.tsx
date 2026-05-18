import { useCallback, useMemo, useState, type FC } from 'react';
import {
  GDCalendarActionsContext,
  GDCalendarContext,
} from './GDCalendarContext';
import type {
  TCalendarActionsContext,
  TCalendarContext,
  TChangeDirection,
  TGDCalendarProviderProps,
} from './types';
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
import { useControlled } from '../utils/useControlled';

export const GDCalendarProvider: FC<TGDCalendarProviderProps> = ({
  children,
  onDateChanged: controlledOnDateChanged,
  date: controlledDate,
  yearSpan = 100,
  formatWeekDays = 'short',
  formatMonthDays = 'short',
  mondayFirst = false,
  locale,
  workingWeek = 7,
}) => {
  const today = useToday();

  const [direction, setDirection] = useState<TChangeDirection>('none');
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

      setDirection('none');

      onDateChanged(newDate);
    },
    [onDateChanged, currentDate]
  );

  const setYear = useCallback(
    (year: number) => {
      const newDate = clone(currentDate);

      newDate.setFullYear(year);

      setDirection('none');

      onDateChanged(newDate);
    },
    [currentDate, onDateChanged]
  );

  const nextMonth = useCallback(() => {
    const newDate = add(currentDate, 1, 'month');
    setDirection('next');
    onDateChanged(newDate);
  }, [currentDate, onDateChanged]);

  const nextYear = useCallback(() => {
    const newDate = add(currentDate, 1, 'year');
    setDirection('next');
    onDateChanged(newDate);
  }, [currentDate, onDateChanged]);

  const prevMonth = useCallback(() => {
    const newDate = subtract(currentDate, 1, 'month');
    setDirection('prev');
    onDateChanged(newDate);
  }, [currentDate, onDateChanged]);

  const prevYear = useCallback(() => {
    const newDate = subtract(currentDate, 1, 'year');
    setDirection('prev');
    onDateChanged(newDate);
  }, [currentDate, onDateChanged]);

  const setDisplayedMonth = useCallback(
    (newDate: Date, dir = 'none' as TChangeDirection) => {
      const date = startOfDay(newDate);
      setDirection(dir);
      onDateChanged(date);
    },
    [onDateChanged]
  );

  const setToday = useCallback(() => {
    const date = startOfDay(today);
    setDirection('none');

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
      direction,
      workingWeek,
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
      direction,
      workingWeek,
    ]
  );
  const actions = useMemo(
    (): TCalendarActionsContext => ({
      nextMonth,
      nextYear,
      prevMonth,
      prevYear,
      setMonth,
      setYear,
      setDisplayedMonth,
      setToday,
    }),
    [
      nextMonth,
      nextYear,
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
