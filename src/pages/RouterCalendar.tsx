import moment, { type Moment } from 'moment';
import CalendarWidget from '../components/CalendarWidget/CalendarWidget';
import { Link, useNavigate, useParams } from 'react-router-dom';

const RouterCalendar = () => {
  const navigate = useNavigate();
  const { year, month, date } = useParams();

  console.log(year, month, date);

  const calendarDateChanged = (date: Moment | string) => {
    //
    if (typeof date !== 'string') {
      navigate(
        `/router-calendar/${date.year()}/${date.month() + 1}/${date.date()}`
      );
    }
  };

  const current = moment();
  if (year) current.year(parseInt(year, 10));
  if (month) current.month((parseInt(month, 10) || 1) - 1);
  if (date) current.date(parseInt(date, 10) || 1);

  return (
    <section>
      <article>
        <p>
          React Calendar Widget example - calendar date is fed from the route
        </p>
      </article>
      <article className="widgets">
        <CalendarWidget
          todayDate={moment()}
          currentMonth={current}
          onDateChanged={calendarDateChanged}
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default RouterCalendar;
