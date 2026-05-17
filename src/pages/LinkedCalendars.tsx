import { useCallback, useMemo, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { GDCalendar } from '../components/GDCalendar';
import { add, clone, subtract } from '../components/GDCalendar/utils';
import type { TRangeSelection } from '../components/GDCalendar/types';
import { useImmer } from '../utils/useImmer';
import { MondayFirstButton } from './toolbox/MondayFirstButton';
import { AnimateToggleButton } from './toolbox/AnimateToggleButton';
import { DateSelected } from './toolbox/DateSelected';

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
  const [animate, setAnimate] = useState(false);

  const currentCalendarDateChanged = useCallback((date: Date) => {
    // console.log('currentCalendarDateChanged', date.toISOString());
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
        <div className="button-group">
          <MondayFirstButton
            onClick={() => setMondayFirst((old) => !old)}
            mondayFirst={mondayFirst}
          />
          <AnimateToggleButton
            onClick={() => setAnimate((old) => !old)}
            animate={animate}
          />
        </div>
        <DateSelected selection={selection} />
      </article>
      <article className="widgets">
        <GDCalendar
          className="linked currentMonth"
          date={current}
          onDateChanged={currentCalendarDateChanged}
          selection={selection}
          onDateSelected={handleRangeSelection}
          animate={animate}
          mondayFirst={mondayFirst}
        />
        <GDCalendar
          className="linked nextMonth"
          date={next}
          onDateChanged={nextCalendarDateChanged}
          selection={selection}
          onDateSelected={handleRangeSelection}
          animate={animate}
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
