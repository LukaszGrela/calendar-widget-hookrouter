import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import moment, { type Moment } from 'moment';
import CalendarWidget from '../components/CalendarWidget/CalendarWidget';

interface IProps {
  initialDate?: Moment;
}

const LinkedCalendars: FC<IProps> = ({ initialDate = moment() }) => {
  const [current, setCurrent] = useState(() => initialDate);

  const currentCalendarDateChanged = (date: Moment) => {
    setCurrent(date.clone());
  };

  const nextCalendarDateChanged = (date: Moment) => {
    setCurrent(date.clone().subtract(1, 'months'));
  };

  const today = moment();
  const next = current.clone().add(1, 'months');

  return (
    <section className="linked-calendars">
      <article>
        <p>React Calendar Widget example.</p>
      </article>
      <article className="widgets">
        <CalendarWidget
          className="linked currentMonth"
          todayDate={today}
          currentMonth={current}
          onDateChanged={currentCalendarDateChanged}
        />
        <CalendarWidget
          className="linked nextMonth"
          todayDate={today}
          currentMonth={next}
          onDateChanged={nextCalendarDateChanged}
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default LinkedCalendars;
