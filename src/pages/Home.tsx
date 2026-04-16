import moment from 'moment';
import { Link } from 'react-router-dom';

const Home = () => {
  const now = moment();
  return (
    <section className="home">
      <article>
        <p>React Calendar Widget example.</p>
      </article>
      <nav>
        <Link
          to={`/router-calendar/${now.year()}/${now.month() + 1}/${now.date()}`}
        >
          Routed Calendar
        </Link>
        <Link to="/linked-calendars">Linked Calendars</Link>

        <Link to="/ts-calendar">TypeScript GDCalendar</Link>
        <Link to="/ts-clock">TypeScript GDClock</Link>
      </nav>
    </section>
  );
};

export default Home;
