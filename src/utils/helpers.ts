import type { Moment } from 'moment';

export const noop = () => {};

/**
 * Creates a list of numbers around the given number, used to create a list of years.
 * e.g. `getYearList(1979,10)` will create a list with 21 items spaning from 1969 to 1989
 * @param start reference number
 * @param around amount before and after of reference number
 */
export const getYearList = (start: number, around: number) => {
  const years: number[] = [];
  for (let i = start - around; i <= start + around; i++) {
    years.push(i);
  }
  return years;
};

export const calendarDates = (now: Moment) => {
  const firstOfMonth = now.clone().date(1);
  const startsAt = firstOfMonth.day();
  // 6 weeks always to allow for 31days starting at last day of week
  const weeks: Moment[][] = [[], [], [], [], [], []];
  let start = -startsAt;
  let week = 0;
  while (week < weeks.length) {
    let weekDay = 0;
    while (weekDay < 7) {
      weeks[week].push(firstOfMonth.clone().add(start, 'days'));
      start++;
      weekDay++;
    }
    week++;
  }
  return weeks;
};
