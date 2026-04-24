import { Link, useNavigate, useParams } from 'react-router-dom';
import { GDCalendar } from '../components/GDCalendar';
import { useMemo } from 'react';

const RouterCalendar = () => {
  const navigate = useNavigate();
  const { year, month, date } = useParams();

  console.log(year, month, date);

  const calendarDateChanged = (date: Date) => {
    navigate(
      `/router-calendar/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    );
  };

  const current = useMemo(() => {
    const now = new Date();

    if (year) now.setFullYear(parseInt(year, 10));
    if (month) now.setMonth((parseInt(month, 10) || 1) - 1);
    if (date) now.setDate(parseInt(date, 10) || 1);

    return now;
  }, [date, month, year]);

  return (
    <section>
      <article>
        <p>
          React Calendar Widget example - calendar date is fed from the route
        </p>
      </article>
      <article className="widgets">
        <GDCalendar date={current} onDateChanged={calendarDateChanged} />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default RouterCalendar;
