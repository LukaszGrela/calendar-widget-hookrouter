export type TUnitOfTime =
  | 'year'
  | 'years'
  | 'month'
  | 'months'
  | 'date'
  | 'day'
  | 'days'
  | 'hour'
  | 'hours'
  | 'minute'
  | 'minutes'
  | 'second'
  | 'seconds'
  | 'ms';

export const SECOND_MS = 1000;
export const MINUTE_MS = 60 * SECOND_MS;
export const HOUR_MS = 60 * MINUTE_MS;
export const DAY_MS = 24 * HOUR_MS;

export const noop = () => {};

export const clone = (date: Date | number | string): Date => new Date(date);

const addMillisecond = (date: Date, amount: number): Date => {
  const change = clone(date);
  change.setUTCMilliseconds(change.getUTCMilliseconds() + amount);
  return change;
};
const addSecond = (date: Date, amount: number): Date => {
  const change = clone(date);
  change.setUTCSeconds(change.getUTCSeconds() + amount);
  return change;
};
const addMinute = (date: Date, amount: number): Date => {
  const change = clone(date);
  change.setUTCMinutes(change.getUTCMinutes() + amount);
  return change;
};
const addHour = (date: Date, amount: number): Date => {
  const change = clone(date);
  change.setUTCHours(change.getUTCHours() + amount);
  return change;
};
const addDay = (date: Date, amount: number): Date => {
  const change = clone(date);
  change.setUTCDate(change.getUTCDate() + amount);
  return change;
};
const addMonth = (date: Date, amount: number): Date => {
  const change = clone(date);
  change.setUTCMonth(change.getUTCMonth() + amount);
  return change;
};
const addYear = (date: Date, amount: number): Date => {
  const change = clone(date);
  change.setUTCFullYear(change.getUTCFullYear() + amount);
  return change;
};

export const add = (date: Date, amount: number, unit: TUnitOfTime): Date => {
  if (unit === 'ms') {
    return addMillisecond(date, Math.abs(amount));
  }
  if (unit === 'second' || unit === 'seconds') {
    return addSecond(date, Math.abs(amount));
  }
  if (unit === 'minute' || unit === 'minutes') {
    return addMinute(date, Math.abs(amount));
  }
  if (unit === 'hour' || unit === 'hours') {
    return addHour(date, Math.abs(amount));
  }
  if (unit === 'date' || unit === 'day' || unit === 'days') {
    return addDay(date, Math.abs(amount));
  }
  if (unit === 'month' || unit === 'months') {
    return addMonth(date, Math.abs(amount));
  }
  if (unit === 'year' || unit === 'years') {
    return addYear(date, Math.abs(amount));
  }

  return date;
};

export const subtract = (
  date: Date,
  amount: number,
  unit: TUnitOfTime
): Date => {
  if (unit === 'ms') {
    return addMillisecond(date, Math.abs(amount) * -1);
  }
  if (unit === 'second' || unit === 'seconds') {
    return addSecond(date, Math.abs(amount) * -1);
  }
  if (unit === 'minute' || unit === 'minutes') {
    return addMinute(date, Math.abs(amount) * -1);
  }
  if (unit === 'hour' || unit === 'hours') {
    return addHour(date, Math.abs(amount) * -1);
  }
  if (unit === 'date' || unit === 'day' || unit === 'days') {
    return addDay(date, Math.abs(amount) * -1);
  }
  if (unit === 'month' || unit === 'months') {
    return addMonth(date, Math.abs(amount) * -1);
  }
  if (unit === 'year' || unit === 'years') {
    return addYear(date, Math.abs(amount) * -1);
  }

  return date;
};

export const startOfDay = (date: Date): Date => {
  const change = clone(date);

  change.setMilliseconds(0);
  change.setSeconds(0);
  change.setMinutes(0);
  change.setHours(0);

  return change;
};
/*
console.group('startOfDay');
console.log('startOfDay(now)', startOfDay(new Date()));
console.log('startOfDay(tomorrow)', startOfDay(add(new Date(), 1, 'date')));
console.groupEnd();
*/

// 0 day of the week
const weekReferenceDateSunday = clone(Date.UTC(2020, 10, 1, 0, 0, 0, 0));
/**
 * Return a list of current locale week days
 * @param format The `Intl.DateTimeFormatOptions#weekday` values to indicate format of the week day, `long` e.g. Monday, `short` e.g. `Mon` and `narrow` e.g. `M`
 */
export const weekDays = (
  format: 'long' | 'short' | 'narrow',
  locale?: Intl.LocalesArgument,
  mondayFirst = false
): string[] => {
  // clone reference date as we will mutate it
  const date = clone(weekReferenceDateSunday);
  const week: string[] = (
    mondayFirst ? [2, 3, 4, 5, 6, 7, 8] : [1, 2, 3, 4, 5, 6, 7]
  ).map((i: number): string => {
    date.setUTCDate(i);
    return date.toLocaleDateString(locale, { weekday: format });
  });

  return week;
};

/**
 * Return a list of localized month names for the whole year.
 * @param format The `Intl.DateTimeFormatOptions#month` values to indicate format of the month, `long` e.g. January, `short` e.g. Jan and `narrow` e.g. J
 * @param locale Optional locale to use, fallback to default runtime locale.
 */
export const monthNames = (
  format: 'long' | 'short' | 'narrow',
  locale?: Intl.LocalesArgument
): string[] => {
  const months: string[] = [];
  for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
    const date = clone(Date.UTC(2020, monthIndex, 1, 0, 0, 0, 0));
    months.push(
      date.toLocaleDateString(locale, {
        month: format,
      })
    );
  }
  return months;
};

/**
 * Creates a list of numbers around the given number, used to create a list of years.
 * e.g. `getYearList(1979,10)` will create a list with 21 items spaning from 1969 to 1989
 * @param start reference number
 * @param around amount before and after of reference number
 */
export const getYearList = (start: number, around: number): number[] => {
  const years: number[] = [];
  for (let i = start - around; i <= start + around; i++) {
    years.push(i);
  }
  return years;
};

/**
 * Creates a list of dates to build calendar page. It will create a span of 6 weeks to accomodate previous and next months.
 * @param now reference date
 * @param mondayFirst when `true` calendar week starts on Monday, and dates are offset by 1.
 */
export const calendarDates = (now: Date, mondayFirst = false) => {
  const firstOfMonth = clone(now);
  firstOfMonth.setDate(1);

  const startsAt = firstOfMonth.getDay();
  /**
   * 6 weeks always to allow for 31days starting at last day of week
   */
  const weeks: Date[][] = [[], [], [], [], [], []];

  let start = -startsAt;

  if (mondayFirst) {
    start += 1;
  }

  if (start === 0 || (mondayFirst && start === 1)) {
    // this will make sure previous month is available in the first row
    start = -7;
  }

  let week = 0;
  while (week < weeks.length) {
    let weekDay = 0;
    while (weekDay < 7) {
      weeks[week].push(addDay(firstOfMonth, start));
      start++;
      weekDay++;
    }
    week++;
  }

  return weeks;
};

/**
 * Checks if given date is earlier than (not equal) to test date. If test date is not given then current date is used.
 * @param a Date to test if it is earlier than
 * @param b Date to compare with, default is current date (`new Date()`)
 */
export const dateEarlierThan = (a?: Date, b: Date = new Date()): boolean => {
  if (!a) return false; // no dates to compare
  // compare (unix epoch)
  return a.getTime() < b.getTime();
};
export const dateEarlierThanOrEqual = (
  a?: Date,
  b: Date = new Date()
): boolean => {
  if (!a) return false; // no dates to compare
  // compare (unix epoch)
  return a.getTime() <= b.getTime();
};

/**
 * Checks if given date is later than (not equal) to test date. If test date is not given then current date is used.
 * @param a Date to test if it is later than
 * @param b Date to compare with, default is current date (`new Date()`)
 */
export const dateLaterThan = (a?: Date, b: Date = new Date()): boolean => {
  if (!a) return false; // no dates to compare
  // compare (unix epoch)
  return a.getTime() > b.getTime();
};
export const dateLaterThanOrEqual = (
  a?: Date,
  b: Date = new Date()
): boolean => {
  if (!a) return false; // no dates to compare
  // compare (unix epoch)
  return a.getTime() >= b.getTime();
};

/**
 * Compares 2 dates to check if they are the same at given precision.
 * @param a First date
 * @param b Second date
 * @param precision precision of test, after which time property to stop comparison, default `ms` meaning full comparison.
 */
export const datesSame = (
  a?: Date,
  b?: Date,
  precision: TUnitOfTime = 'ms'
): boolean => {
  if (!a || !b) return false; // no dates to compare, surely not the same dates:)

  // both dates exist compare by precision
  if (a && b) {
    if (precision === 'ms') {
      // check full precision
      // compare UTC (unix epoch)
      return a.getTime() === b.getTime();
    }
    const diffYear = a.getUTCFullYear() !== b.getUTCFullYear();
    if (precision === 'year') {
      // stop at year
      return !diffYear;
    }

    const diffMonth = a.getUTCMonth() !== b.getUTCMonth();
    if (precision === 'month') {
      // stop at month
      return !diffYear && !diffMonth;
    }

    const diffDate = a.getUTCDate() !== b.getUTCDate();
    if (precision === 'date' || precision === 'day') {
      // stop at date
      return !diffYear && !diffMonth && !diffDate;
    }

    const diffHour = a.getUTCHours() !== b.getUTCHours();
    if (precision === 'hour') {
      //stop at hours
      return !diffYear && !diffMonth && !diffDate && !diffHour;
    }

    const diffMin = a.getUTCMinutes() !== b.getUTCMinutes();
    if (precision === 'minute') {
      // stop at minutes
      return !diffYear && !diffMonth && !diffDate && !diffHour && !diffMin;
    }
    const diffSec = a.getUTCSeconds() !== b.getUTCSeconds();
    if (precision === 'second') {
      //stop at seconds
      return (
        !diffYear &&
        !diffMonth &&
        !diffDate &&
        !diffHour &&
        !diffMin &&
        !diffSec
      );
    }
  }
  return false;
};
/* 
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === true
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 14)
  ) === false
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 14),
    'second'
  ) === true
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 10, 15),
    'second'
  ) === false
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 10, 15),
    'minute'
  ) === true
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 2, 10, 15),
    'minute'
  ) === false
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 2, 10, 15),
    'hour'
  ) === true
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 13, 2, 10, 15),
    'hour'
  ) === false
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 13, 2, 10, 15),
    'date'
  ) === true
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 14, 13, 2, 10, 15),
    'date'
  ) === false
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 14, 13, 2, 10, 15),
    'month'
  ) === true
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 4, 14, 13, 2, 10, 15),
    'month'
  ) === false
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 4, 14, 13, 2, 10, 15),
    'year'
  ) === true
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1980, 8, 16, 12, 1, 14, 15),
    'year'
  ) === false
);
console.log(
  'datesSame',
  datesSame(undefined, new Date(1980, 8, 16, 12, 1, 14, 15)) === false
);
console.log(
  'datesSame',
  datesSame(new Date(1980, 8, 16, 12, 1, 14, 15), undefined) === false
);
console.log('datesSame', datesSame(undefined, undefined) === false);
{
  const jun30bst = new Date('Wed Jun 30 1999 23:00:00 GMT+0100');
  const jul1cet = new Date('Thu Jul 01 1999 00:00:00 GMT+0200');
  console.log('datesSame', datesSame(jun30bst, jul1cet) === true);
} 
*/
/*
console.log(
  'dateEarlierThan',
  dateEarlierThan(undefined, new Date(1980, 8, 16, 12, 1, 14, 15)) === false
);
console.log(
  '!dateEarlierThan',
  dateEarlierThan(new Date(1980, 8, 16, 12, 1, 14, 15), undefined) === true
);
console.log('dateEarlierThan', dateEarlierThan(undefined, undefined) === false);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1980, 8, 16, 12, 1, 14, 15)
  ) === true
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1980, 8, 16, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === false
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === false
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1979, 5, 13, 12, 1, 14, 1),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === true
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1979, 5, 13, 12, 1, 1, 15),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === true
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1979, 5, 13, 12, 0, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === true
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1979, 5, 13, 1, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === true
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1979, 5, 1, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === true
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1979, 1, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === true
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(197, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === true
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(new Date(), new Date(1979, 5, 13, 12, 1, 14, 15)) === false
);
console.log('dateEarlierThan', dateEarlierThan(new Date()) === false);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1979, 5, 13, 12, 1, 14, 14),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === true
);
console.log(
  'dateEarlierThan',
  dateEarlierThan(
    new Date(1979, 5, 13, 12, 1, 14, 16),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  ) === false
);
*/
/*
const refDate = new Date();
console.group('date utils - add');
console.log('ms', refDate.toISOString(), add(refDate, 1, 'ms').toISOString());
console.log(
  'second',
  refDate.toISOString(),
  add(refDate, 1, 'second').toISOString()
);
console.log(
  'minute',
  refDate.toISOString(),
  add(refDate, 1, 'minute').toISOString()
);
console.log(
  'hour',
  refDate.toISOString(),
  add(refDate, 1, 'hour').toISOString()
);
console.log(
  'day/date',
  refDate.toISOString(),
  add(refDate, 1, 'day').toISOString()
);
console.log(
  'month',
  refDate.toISOString(),
  add(refDate, 1, 'month').toISOString()
);
console.log(
  'year',
  refDate.toISOString(),
  add(refDate, 1, 'year').toISOString()
);
console.groupEnd();

console.group('date utils - subtract');
console.log(
  'ms',
  refDate.toISOString(),
  subtract(refDate, 1, 'ms').toISOString()
);
console.log(
  'second',
  refDate.toISOString(),
  subtract(refDate, 1, 'second').toISOString()
);
console.log(
  'minute',
  refDate.toISOString(),
  subtract(refDate, 1, 'minute').toISOString()
);
console.log(
  'hour',
  refDate.toISOString(),
  subtract(refDate, 1, 'hour').toISOString()
);
console.log(
  'day/date',
  refDate.toISOString(),
  subtract(refDate, 1, 'day').toISOString()
);
console.log(
  'month',
  refDate.toISOString(),
  subtract(refDate, 1, 'month').toISOString()
);
console.log(
  'year',
  refDate.toISOString(),
  subtract(refDate, 1, 'year').toISOString()
);
console.groupEnd();

console.group('date utils - add subtract equality');
console.log('ms', datesSame(add(subtract(refDate, 1, 'ms'), 1, 'ms'), refDate));
console.log(
  'second',
  datesSame(add(subtract(refDate, 1, 'second'), 1, 'second'), refDate)
);
console.log(
  'minute',
  datesSame(add(subtract(refDate, 1, 'minute'), 1, 'minute'), refDate)
);
console.log(
  'hour',
  datesSame(add(subtract(refDate, 1, 'hour'), 1, 'hour'), refDate)
);
console.log(
  'day/date',
  datesSame(add(subtract(refDate, 1, 'day'), 1, 'date'), refDate)
);
console.log(
  'month',
  datesSame(add(subtract(refDate, 1, 'month'), 1, 'month'), refDate)
);
console.log(
  'year',
  datesSame(add(subtract(refDate, 1, 'year'), 1, 'year'), refDate)
);
console.groupEnd();

console.group('date utils - subtract add equality');
console.log('ms', datesSame(subtract(add(refDate, 1, 'ms'), 1, 'ms'), refDate));
console.log(
  'second',
  datesSame(subtract(add(refDate, 1, 'second'), 1, 'second'), refDate)
);
console.log(
  'minute',
  datesSame(subtract(add(refDate, 1, 'minute'), 1, 'minute'), refDate)
);
console.log(
  'hour',
  datesSame(subtract(add(refDate, 1, 'hour'), 1, 'hour'), refDate)
);
console.log(
  'day/date',
  datesSame(subtract(add(refDate, 1, 'day'), 1, 'date'), refDate)
);
console.log(
  'month',
  datesSame(subtract(add(refDate, 1, 'month'), 1, 'month'), refDate)
);
console.log(
  'year',
  datesSame(subtract(add(refDate, 1, 'year'), 1, 'year'), refDate)
);
console.groupEnd();
*/
