import React, { useMemo, type ReactNode } from 'react';
import { GDCalendarDay } from '../GDCalendarDay';
import { classNames } from '../../../utils/classNames';
import type { TDateData, TRangeSelection, TWorkingWeek } from '../types';
import { datesSame, dateWithinRange } from '../utils';

export interface IProps {
  className?: string;
  days: TDateData[];
  // selected date
  selection?: Date | TRangeSelection | null;
  // reference date for "now"/"today"
  now?: Date;
  onClick: (data: TDateData) => void;

  workingWeek?: TWorkingWeek;
  mondayFirst?: boolean;
}

const GDCalendarRow: React.FC<IProps> = ({
  className,
  days,
  now,
  selection,
  onClick = () => {},
  workingWeek = 7,
  mondayFirst = false,
}: IProps): ReactNode => {
  const filteredWeek = useMemo(() => {
    const copy = days.concat();
    if (workingWeek !== 7) {
      if (mondayFirst) {
        return copy.splice(0, workingWeek);
      } else {
        return copy.splice(1, workingWeek);
      }
    }
    return copy;
  }, [mondayFirst, days, workingWeek]);

  return (
    <div className={classNames('GDCalendar_Row', className)}>
      {filteredWeek.map((data, index): ReactNode => {
        const { date: day } = data;
        const key = day.toISOString();
        return (
          <GDCalendarDay
            key={key}
            className={`day-${index}`}
            data={data}
            onClick={onClick}
            today={now && datesSame(day, now, 'day')}
            selected={!!(selection && dateWithinRange(day, selection))}
            startSelection={
              !!(
                selection &&
                !(selection instanceof Date) &&
                !!selection[0] &&
                datesSame(day, selection[0])
              )
            }
            endSelection={
              !!(
                selection &&
                !(selection instanceof Date) &&
                ((!!selection[1] && datesSame(day, selection[1])) ||
                  (!!selection[0] &&
                    !selection[1] &&
                    datesSame(day, selection[0])))
              )
            }
          />
        );
      })}
    </div>
  );
};

export default GDCalendarRow;
