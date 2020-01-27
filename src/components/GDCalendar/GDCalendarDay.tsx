import React, { useMemo } from "react";

export interface IProps {
  className?: string;
  date: string | Date;
  onClick: (date: string | Date) => void;
}

const GDCalendarDay: React.FC<IProps> = ({
  className,
  date,
  onClick
}: IProps): JSX.Element => {
  const classNameMemo = useMemo((): string => {
    return `calendar-day${className ? ` ${className}` : ""}`;
  }, [className]);
  const dateResult = useMemo((): string => {
    if (typeof date === "string") {
      return date;
    }
    return `${date.getDate()}`;
  }, [date]);
  return (
    <div
      className={classNameMemo}
      onClick={() => {
        onClick(date);
      }}
    >
      {dateResult}
    </div>
  );
};

export default GDCalendarDay;
