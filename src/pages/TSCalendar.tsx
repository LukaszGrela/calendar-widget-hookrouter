import React from "react";
import { A } from "hookrouter";
import GDCalendar from "../components/GDCalendar/GDCalendar";
import { weekDays } from "../components/GDCalendar/utils";

export interface IProps {}
const TSCalendar: React.FC<IProps> = (props: IProps): JSX.Element => {
  const calendarDayClicked = (date: Date | undefined): void => {
    console.log("calendarDayClicked", date);
  };
  return (
    <section>
      <article>
        <p>TypeScript React Calendar Widget</p>
      </article>
      <article className="widgets">
        <GDCalendar
          weekdays={weekDays("short")}
          onDateChanged={calendarDayClicked}
        />
      </article>
      <nav>
        <A href="/">Home</A>
      </nav>
    </section>
  );
};

export default TSCalendar;
