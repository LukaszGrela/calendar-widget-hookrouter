import { Link } from 'react-router-dom';

const Home = () => {
  const now = new Date();
  return (
    <section className="home">
      <article>
        <p>React Calendar Widget example.</p>
      </article>
      <nav>
        <Link to="/calendar">Calendar widget</Link>
        <Link
          to={`/router-calendar/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`}
        >
          Routed Calendar
        </Link>
        <Link to="/linked-calendars">Linked Calendars</Link>
        <Link to="/ts-clock">TypeScript GDClock</Link>
        <Link to="/year-view">12 months</Link>
        <Link to="/date-selector">Date selector dropdown</Link>
      </nav>
    </section>
  );
};

export default Home;
