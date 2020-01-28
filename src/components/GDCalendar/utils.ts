export const noop = () => {};

// 0 day of the week
const weekReferenceDateSunday = new Date(Date.UTC(2020, 10, 1, 0, 0, 0, 0));
export const weekDays = (format: 'long' | 'short' | 'narrow'): string[] => {
  // clone reference date as we will mutate it
  const date = new Date(weekReferenceDateSunday);
  let week: string[] = [1, 2, 3, 4, 5, 6, 7].map((i: number): string => {
    date.setUTCDate(i);
    return date.toLocaleDateString([], { weekday: format });
  });

  return week;
};

export const getYearList = (start: number, around: number): number[] => {
  let years: number[] = [];
  for (let i = start - around; i <= start + around; i++) {
    years.push(i);
  }
  return years;
};

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
  if (!a && !b) return false; // no dates to compare, surely not the same dates:)
  if (!a && b) return false;
  if (a && !b) return false;

  // both dates exist compare by precision
  if (a && b) {
    const diffYear = a.getFullYear() !== b.getFullYear();
    if (precision === 'year') {
      // stop at year
      return !diffYear;
    }

    const diffMonth = a.getMonth() !== b.getMonth();
    if (precision === 'month') {
      // stop at month
      return !diffYear && !diffMonth;
    }

    const diffDate = a.getDate() !== b.getDate();
    if (precision === 'date') {
      // stop at date
      return !diffYear && !diffMonth && !diffDate;
    }

    const diffHour = a.getHours() !== b.getHours();
    if (precision === 'hour') {
      //stop at hours
      return !diffYear && !diffMonth && !diffDate && !diffHour;
    }

    const diffMin = a.getMinutes() !== b.getMinutes();
    if (precision === 'minute') {
      // stop at minutes
      return !diffYear && !diffMonth && !diffDate && !diffHour && !diffMin;
    }
    const diffSec = a.getSeconds() !== b.getSeconds();
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

    // check full precision
    const diffMs = a.getMilliseconds() !== b.getMilliseconds();

    return (
      !diffYear &&
      !diffMonth &&
      !diffDate &&
      !diffHour &&
      !diffMin &&
      !diffSec &&
      !diffMs
    );
  }
  return false;
};
/*
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 15)
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 14)
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 14, 14),
    'second'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 10, 15),
    'second'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 1, 10, 15),
    'minute'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 2, 10, 15),
    'minute'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 12, 2, 10, 15),
    'hour'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 13, 2, 10, 15),
    'hour'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 13, 13, 2, 10, 15),
    'date'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 14, 13, 2, 10, 15),
    'date'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 5, 14, 13, 2, 10, 15),
    'month'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 4, 14, 13, 2, 10, 15),
    'month'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1979, 4, 14, 13, 2, 10, 15),
    'year'
  )
);
console.log(
  'datesSame',
  datesSame(
    new Date(1979, 5, 13, 12, 1, 14, 15),
    new Date(1980, 8, 16, 12, 1, 14, 15),
    'year'
  )
);
console.log(
  'datesSame',
  datesSame(undefined, new Date(1980, 8, 16, 12, 1, 14, 15))
);
console.log(
  'datesSame',
  datesSame(new Date(1980, 8, 16, 12, 1, 14, 15), undefined)
);
console.log('datesSame', datesSame(undefined, undefined));
*/
