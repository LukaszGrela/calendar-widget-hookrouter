import type { TDateData, TRangeSelection } from '../types';

export type TCalendarContext = {
  prevDay: () => void;
  nextDay: () => void;
  prevMonth: () => void;
  nextMonth: () => void;
  prevYear: () => void;
  nextYear: () => void;

  setYear: (date: Date) => void;
  setMonth: (date: Date) => void;

  today: Date;

  weekdays: string[];
  monthList: string[];

  currentMonth: Date;

  yearSpan: number;
  yearList: number[];

  mondayFirst: boolean;
  locale?: Intl.LocalesArgument;
  weeks: TDateData[][];
};

export type TCalendarSelectionContext = {
  selection?: Date | TRangeSelection;
};
export type TCalendarSelectionActionContext = {
  selectDate: (date?: TDateData | undefined) => void;
};
