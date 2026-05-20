import React, { useCallback, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  GDCalendar,
  type IProps,
  type TRangeSelection,
} from '../components/GDCalendar';
import { datesSame } from '../components/GDCalendar/utils';
import { MondayFirstButton } from './toolbox/MondayFirstButton';
import { AnimateToggleButton } from './toolbox/AnimateToggleButton';
import { DateSelected } from './toolbox/DateSelected';
import { WorkingWeekLength } from './toolbox/WorkingWeekLength';
import {
  HolidaySelector,
  type THolidaysKeys,
  type THolidaysMap,
} from './toolbox/HolidaySelector';

const Calendar: React.FC = (): ReactNode => {
  const [holidaysSelection, setHolidaysSelection] =
    useState<THolidaysKeys>('none');
  const [holidays, setHolidays] = useState<THolidaysMap | null>(null);

  const [date, setDate] = useState<Date | undefined | null>();
  const [mondayFirst, setMondayFirst] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [workingWeek, setWorkingWeek] =
    useState<Exclude<IProps['workingWeek'], undefined | null>>(7);

  const changeHoliday = useCallback(
    (value: THolidaysKeys, map: THolidaysMap | null) => {
      setHolidaysSelection(value);
      setHolidays(map);
    },
    []
  );

  const handleHolidayCheck = useCallback(
    (date: Date) => {
      const isoKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const yearlessKey = `*-${date.getMonth()}-${date.getDate()}`;

      if (!holidays) return false;

      const matched = [
        ...(holidays.get(isoKey) ?? []),
        ...(holidays.get(yearlessKey) ?? []),
      ];

      return (matched?.length ?? 0) > 0;
    },
    [holidays]
  );
  const calendarDayClicked = (
    clicked?: Date | TRangeSelection | null
  ): void => {
    if (!clicked || clicked instanceof Date) {
      setDate((prevState) => {
        if (clicked && prevState && datesSame(prevState, clicked)) return null;

        return clicked;
      });
    }
  };

  const animateConfig = useMemo((): IProps['animate'] => {
    if (animate) {
      return {
        appear: true,
      };
    }
    return false;
  }, [animate]);

  return (
    <section className="ts-calendar">
      <article>
        <p>React Calendar</p>
        <p style={{ fontSize: '0.75em' }}>Uncontrolled</p>
      </article>
      <article className="toolbox">
        <div className="button-group">
          <MondayFirstButton
            onClick={() => setMondayFirst((old) => !old)}
            mondayFirst={mondayFirst}
          />
          <AnimateToggleButton
            onClick={() => setAnimate((old) => !old)}
            animate={animate}
          />
          <WorkingWeekLength value={workingWeek} onChange={setWorkingWeek} />
          <HolidaySelector value={holidaysSelection} onChange={changeHoliday} />
        </div>
        <DateSelected selection={date} />
      </article>
      <article className="widgets">
        <GDCalendar
          onDateSelected={calendarDayClicked}
          selection={date}
          mondayFirst={mondayFirst}
          animate={animateConfig}
          workingWeek={workingWeek}
          holidayCallback={handleHolidayCheck}
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default Calendar;
