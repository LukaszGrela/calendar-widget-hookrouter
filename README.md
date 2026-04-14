# Calendar Widget

[React Calendar Widget](https://github.com/LukaszGrela/calendar-widget) example, react router was replaced with the [Hookroutes](https://parastudios.de/modern-and-clean-routing-with-hooks/).

[Live Example - Routed Calendar](https://clock-widget.greladesign.co/router-calendar/2020/2/4)
[Live Example - Linked Calendars](https://clock-widget.greladesign.co/linked-calendars)

## Extra components

There are 2 more components made with TypeScript available here

### GDCalendar

Similar to CalendarWidget, but with TypeScript and more features.

[Live Example - GDCalendar](https://clock-widget.greladesign.co/ts-calendar)

```JavaScript
import React, { useState, useRef } from 'react';
import GDCalendar from './components/GDCalendar/GDCalendar';

const Example: React.FC = (): JSX.Element => {
  const gdCalendar = useRef<GDCalendar>(null);
  const [date, setDate] = useState<Date>();
  const calendarDayClicked = (date: Date | undefined): void => {
    console.log('Example.calendarDayClicked', date);
    setDate(date);
  };

  return (
    <section className="example">
      <article>
        <p>GDCalendar Example</p>
      </article>
      <article className="toolbox">
        <p>
          <span>Selected:</span>
          <span>{date ? date.toLocaleDateString():'not selected'}</span>
        </p>

        <button
          className="btn today"
          onClick={() => {
            if (gdCalendar.current) {
              gdCalendar.current.selectDate(new Date());
            }
          }}
        >
          Select Today
        </button>
        <button
          className="btn current-month"
          onClick={() => {
            if (gdCalendar.current) {
              gdCalendar.current.displayMonth(new Date());
            }
          }}
        >
          Show current month
        </button>
      </article>
      <article className="widgets">
        <GDCalendar
          ref={gdCalendar}
          date={date}
          onDateChanged={calendarDayClicked}
        />
      </article>
    </section>
  );
};

export default Example;

```

### GDClock

Component to select time in form of a watch dial, like in material-ui.

[Live Example - GDClock](https://clock-widget.greladesign.co/ts-clock)

```JavaScript
import React, { useState } from 'react';
import GDClock from './components/GDClock/GDClock';

type TSpnapToMinutes = 5 | 10 | 15 | 30 | undefined;
const Example: React.FC = (): JSX.Element => {
  const [date, setDate] = useState<Date>();
  const [hours24, setHours24] = useState(false);
  const [snap, setSnap] = useState<TSpnapToMinutes>(undefined);

  return (
    <section className="example">
      <article>
        <p>GDClock Example</p>
      </article>
      <article className="toolbox">
        <p>
          <span>Selected:</span>
          <span>
            {date
              ? date.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'not selected'}
          </span>
        </p>
        <p className="options">
          <button
            className="btn hours-24"
            onClick={() => {
              setHours24(!hours24);
            }}
          >
            {`Set ${hours24 ? '12-hours' : '24-hours'}`}
          </button>
          <label className="snap-selector-label">
            Snap minutes:
            <select
              className="snap-selector"
              name="snap-selector"
              onChange={e => {
                console.log(e.target.value);
                if (e.target.value === 'none') {
                  setSnap(undefined);
                } else {
                  setSnap(parseInt(e.target.value, 10) as TSpnapToMinutes);
                }
              }}
              value={snap}
            >
              {['none', '5', '10', '15', '30'].map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </p>
      </article>
      <article className="widgets">
        <GDClock
          snapMinutes={snap}
          date={new Date()}
          hoursType={hours24 ? '24hours' : 'hours'}
          onDateChanged={(date?: Date): void => {
            setDate(date);
          }}
        />
      </article>
    </section>
  );
};

export default Example;

```
