export interface IProps {
  // current month and day
  date?: Date;
  onDateChanged?: (date: Date) => void;

  // Selected date
  selectedDate?: Date;
  onDateSelected?: (date?: Date) => void;

  yearSpan?: number;

  formatWeekDays?: 'long' | 'short' | 'narrow';
  formatMonthDays?: 'long' | 'short' | 'narrow';

  className?: string;

  mondayFirst?: boolean;

  locale?: Intl.LocalesArgument;
}

export type TArrayElementType<A extends readonly unknown[] | null> =
  A extends readonly (infer ElementType)[] ? ElementType : never;

export type TDateData = {
  date: Date;

  holiday?: boolean;
  // is it a "spill" day - day outside of current month
  spill?: boolean;
  weekend?: boolean;
};
