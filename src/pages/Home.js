import React from "react";
import moment from "moment";
import { A } from "hookrouter";

class Home extends React.Component {
  render = () => {
    const now = moment();
    return (
      <section className="home">
        <article>
          <p>React Calendar Widget example.</p>
        </article>
        <nav>
          <A
            href={`/router-calendar/${now.year()}/${now.month() +
              1}/${now.date()}`}
          >
            Routed Calendar
          </A>
          <A href="/linked-calendars">Linked Calendars</A>

          <A href="/ts-calendar">TypeScript GDCalendar</A>
        </nav>
      </section>
    );
  };
}
export default Home;
