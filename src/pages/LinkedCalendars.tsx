import { useCallback, useMemo, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { GDCalendar2 } from '../components/GDCalendar/GDCalendar2';
import { add, clone, subtract } from '../components/GDCalendar/utils';

interface IProps {
  initialDate?: Date;
}

const LinkedCalendars: FC<IProps> = ({ initialDate = new Date() }) => {
  const [current, setCurrent] = useState(() => initialDate);
  const [selected, setSelected] = useState<Date | undefined>();
  // const [current, setCurrent] = useState(() => initialDate);

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
      <article className="widgets">
        <GDCalendar2
          className="linked currentMonth"
          date={current}
          onDateChanged={currentCalendarDateChanged}
          selectedDate={selected}
          onDateSelected={setSelected}
          />
        <GDCalendar2
          className="linked nextMonth"
          date={next}
          onDateChanged={nextCalendarDateChanged}
          selectedDate={selected}
          onDateSelected={setSelected}
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default LinkedCalendars;
