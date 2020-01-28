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
