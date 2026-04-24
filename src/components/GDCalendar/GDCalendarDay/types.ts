type TWeekDay = {
  date: string;
};

export type TWeekProps = {
  className?: string;
} & TWeekDay;

type TDate = {
  date: Date;
  onClick: (date: Date) => void;
  selected?: boolean;
  // is it a "spill" day - day outside of current month
  spill?: boolean;
  today?: boolean;
};

export type TDateProps = {
  className?: string;
} & TDate;
