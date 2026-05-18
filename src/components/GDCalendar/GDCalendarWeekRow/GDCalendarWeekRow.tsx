import './GDCalendarWeekRow.scss';
import { useGDCalendarContext } from '../context/GDCalendarContext';
import { GDCalendarWeekDay } from '../GDCalendarDay';
import { classNames } from '../../../utils/classNames';
import { useMemo, type FC } from 'react';
import type { TWorkingWeek } from '../types';

export const GDCalendarWeekRowConnected = () => {
  const { weekdays, mondayFirst, workingWeek } = useGDCalendarContext();
  return (
    <GDCalendarWeekRow
      weekdays={weekdays}
      mondayFirst={mondayFirst}
      workingWeek={workingWeek}
    />
  );
};

type TWeekDay = {
  index: number;
  label: string;
  weekend?: boolean;
};

export const GDCalendarWeekRow: FC<{
  weekdays: string[];
  workingWeek?: TWorkingWeek;
  mondayFirst?: boolean;
}> = ({ weekdays, workingWeek = 7, mondayFirst = false }) => {
  console.log('GDCalendarWeekRow', weekdays, mondayFirst, workingWeek);
  const options = useMemo(
    () =>
      weekdays.map((label, index) => {
        const offset = mondayFirst ? 1 : 0;

        return {
          label,
          weekend:
            (!mondayFirst && index === 0) ||
            (mondayFirst && index === 5) ||
            index === 6,
          index: index + offset === 7 ? 0 : index + offset,
        };
      }),
    [mondayFirst, weekdays]
  );
  const filteredWeek = useMemo((): TWeekDay[] => {
    const list = options.concat();

    console.log('list', list.concat());
    if (workingWeek !== 7) {
      console.log('workingWeek', workingWeek);
      const changed = list.concat();
      if (mondayFirst) {
        return changed.splice(0, workingWeek);
      } else {
        return changed.splice(1, workingWeek);
      }
    }
    return list;
  }, [mondayFirst, options, workingWeek]);

  console.log('filteredWeek', filteredWeek);
  return (
    <div className="GDCalendar_WeekHeader GDCalendar_Row">
      {filteredWeek.map((day) => (
        <GDCalendarWeekDay
          key={`${day.label}-${day.index}`}
          className={classNames(
            `weekday-${day.index}`,
            day.weekend && 'weekend'
          )}
          date={day.label}
        />
      ))}
    </div>
  );
};
