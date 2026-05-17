import { Link, useNavigate, useParams } from 'react-router-dom';
import { GDCalendar } from '../components/GDCalendar';
import { useMemo, useState } from 'react';
import { MondayFirstButton } from './toolbox/MondayFirstButton';
import { AnimateToggleButton } from './toolbox/AnimateToggleButton';

const RouterCalendar = () => {
  const navigate = useNavigate();
  const { year, month, date } = useParams();
  const [mondayFirst, setMondayFirst] = useState(true);
  const [animate, setAnimate] = useState(false);

  // console.log(year, month, date);

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
        <p style={{ fontSize: '0.75em' }}>Controlled</p>
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
      </article>
      <article className="widgets">
        <GDCalendar
          date={current}
          onDateChanged={calendarDateChanged}
          mondayFirst={mondayFirst}
          animate={animate}
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default RouterCalendar;
