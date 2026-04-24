export type TCalendarContext = {
  prevDay: () => void;
  nextDay: () => void;
  prevMonth: () => void;
  nextMonth: () => void;
  prevYear: () => void;
  nextYear: () => void;

  setYear: (date: Date) => void;
  setMonth: (date: Date) => void;

  selectDate: (date?: Date | undefined) => void;

  today: Date;

  weekdays: string[];
  monthList: string[];

  currentMonth: Date;
  selectedDate?: Date;

  yearSpan: number;
  yearList: number[];

  mondayFirst: boolean;
  locale?: Intl.LocalesArgument;
  weeks: Date[][];
};
