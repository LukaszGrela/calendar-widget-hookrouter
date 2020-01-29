export const noop = () => {};

// 0 day of the week
const weekReferenceDateSunday = new Date(Date.UTC(2020, 10, 1, 0, 0, 0, 0));
/**
 * Return a list of current locale week days
 * @param format The `Intl.DateTimeFormatOptions#weekday` values to indicate format of the week day, `long` e.g. Monday, `short` e.g. `Mon` and `narrow` e.g. `M`
 */
export const weekDays = (format: 'long' | 'short' | 'narrow'): string[] => {
  // clone reference date as we will mutate it
  const date = new Date(weekReferenceDateSunday);
  let week: string[] = [1, 2, 3, 4, 5, 6, 7].map((i: number): string => {
    date.setUTCDate(i);
    return date.toLocaleDateString([], { weekday: format });
  });

  return week;
};

/**
 * Creates a list of numbers around the given number, used to create a list of years.
 * e.g. `getYearList(1979,10)` will create a list with 21 items spaning from 1969 to 1989
 * @param start reference number
 * @param around amount before and after of reference number
 */
export const getYearList = (start: number, around: number): number[] => {
  let years: number[] = [];
  for (let i = start - around; i <= start + around; i++) {
    years.push(i);
  }
  return years;
};

/**
 * Creates a list of dates to build calendar page. It will create a span of 6 weeks to accomodate previous and next months.
 * @param now reference date
 */
export const calendarDates = (now: Date) => {
  const firstOfMonth = new Date(now);
  firstOfMonth.setDate(1);

  const startsAt = firstOfMonth.getDay();
  let weeks: Date[][] = [[], [], [], [], [], []]; //6 weeks always to allow for 31days starting at last day of week
  let start = -startsAt;
  if (start === 0) {
    // this will make sure previous month is available in the first row
    start = -7;
  }
  let week = 0;
  while (week < weeks.length) {
    let weekDay = 0;
    while (weekDay < 7) {
      const date = new Date(firstOfMonth);
      date.setDate(date.getDate() + start);
      weeks[week].push(date);
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
  precision:
    | 'year'
    | 'month'
    | 'date'
    | 'hour'
    | 'minute'
    | 'second'
    | 'ms' = 'ms'
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
    if (precision === 'date') {
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
