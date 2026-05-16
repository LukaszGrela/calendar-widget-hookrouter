import React, { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GDCalendar, type TRangeSelection } from '../components/GDCalendar';
import { datesSame } from '../components/GDCalendar/utils';

const Calendar: React.FC = (): ReactNode => {
  const [date, setDate] = useState<Date | undefined | null>();
  const [mondayFirst, setMondayFirst] = useState(true);

  const calendarDayClicked = (
    clicked?: Date | TRangeSelection | null
  ): void => {
    if (!clicked || clicked instanceof Date) {
      setDate((prevState) => {
        if (clicked && prevState && datesSame(prevState, clicked))
          return null;

        return clicked;
      });
    }
  };

  return (
    <section className="ts-calendar">
      <article>
        <p>React Calendar</p>
        <p style={{ fontSize: '0.75em' }}>Uncontrolled</p>
      </article>
      <article className="toolbox">
        <button onClick={() => setMondayFirst((old) => !old)}>
          {!mondayFirst ? 'Monday first' : 'Sunday first'}
        </button>
        <div>
          <span>Selected:</span>
          <span>{date ? date.toLocaleDateString() : 'not selected'}</span>
        </div>
      </article>
      <article className="widgets">
        <GDCalendar
          onDateSelected={calendarDayClicked}
          selection={date}
          mondayFirst={mondayFirst}
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default Calendar;
