import type { TDateData } from '../types';

type TWeekDay = {
  date: string;
};

export type TWeekProps = {
  className?: string;
} & TWeekDay;

type TDate = {
  onClick: (data: TDateData) => void;

  selected?: boolean;
  startSelection?: boolean;
  endSelection?: boolean;

  today?: boolean;

  data: TDateData;

  disabled?: boolean;
};

export type TDateProps = {
  className?: string;
} & TDate;
