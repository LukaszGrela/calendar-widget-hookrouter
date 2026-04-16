import type { Moment } from 'moment';
import { noop } from '../../utils/helpers';
import { useCallback, type FC } from 'react';

interface IProps {
  className?: string;
  date: Moment | string;
  handleClick?: (date: Moment | string) => void;
}

const CalendarDay: FC<IProps> = ({ className, date, handleClick = noop }) => {
  const clickHandler = useCallback(() => {
    handleClick(date);
  }, [date, handleClick]);

  const text = typeof date === 'string' ? date : date.date();
  return (
    <div
      className={'day' + (className ? ' ' + className : '')}
      onClick={clickHandler}
    >
      {text}
    </div>
  );
};

export default CalendarDay;
