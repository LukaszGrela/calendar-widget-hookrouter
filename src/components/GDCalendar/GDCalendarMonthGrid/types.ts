export interface IProps {
  // selected date
  date?: Date;
  // current date reference
  now?: Date;
  // display month date
  monthDate?: Date;
  // current month grid data
  weeks: Date[][];
  className?: string;
  onClick?: (date: Date) => void;
}
