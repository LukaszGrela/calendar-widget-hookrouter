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

## CRA

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
