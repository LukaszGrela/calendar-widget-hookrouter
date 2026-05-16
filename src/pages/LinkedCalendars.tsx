import { useCallback, useMemo, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { GDCalendar } from '../components/GDCalendar';
import {
  add,
  clone,
  getDateString,
  subtract,
} from '../components/GDCalendar/utils';
import type { TRangeSelection } from '../components/GDCalendar/types';
import { useImmer } from '../utils/useImmer';

interface IProps {
  initialDate?: Date;
}

const LinkedCalendars: FC<IProps> = ({ initialDate = new Date() }) => {
  const [current, setCurrent] = useState(() => initialDate);
  const [selection, setSelection] = useImmer<TRangeSelection>([
    add(initialDate, 2, 'day'),
    add(initialDate, 8, 'day'),
  ]);
  const handleRangeSelection = useCallback(
    (range?: Date | TRangeSelection | null) => {
      // console.log('LinkedCalendar.handleRangeSelection', range);
      if (!(range instanceof Date)) {
        setSelection((draft) => {
          draft[0] = range?.[0] ?? null;
          draft[1] = range?.[1] ?? null;
        });
      }
    },
    [setSelection]
  );

  const [mondayFirst, setMondayFirst] = useState(true);

  const currentCalendarDateChanged = useCallback((date: Date) => {
    console.log('currentCalendarDateChanged', date.toISOString());
    setCurrent(clone(date));
  }, []);

  const nextCalendarDateChanged = useCallback((date: Date) => {
    setCurrent(subtract(date, 1, 'months'));
  }, []);

  const next = useMemo(() => add(current, 1, 'months'), [current]);

  return (
    <section className="linked-calendars">
      <article>
        <p>React Calendar Widget example.</p>
      </article>
      <article className="toolbox">
        <button onClick={() => setMondayFirst((old) => !old)}>
          {!mondayFirst ? 'Monday first' : 'Sunday first'}
        </button>
        <div>
          <span>Selected:</span>
          <span>{getDateString(selection)}</span>
        </div>
      </article>
      <article className="widgets">
        <GDCalendar
          className="linked currentMonth"
          date={current}
          onDateChanged={currentCalendarDateChanged}
          selection={selection}
          onDateSelected={handleRangeSelection}
          mondayFirst={mondayFirst}
        />
        <GDCalendar
          className="linked nextMonth"
          date={next}
          onDateChanged={nextCalendarDateChanged}
          selection={selection}
          onDateSelected={handleRangeSelection}
          mondayFirst={mondayFirst}
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default LinkedCalendars;
