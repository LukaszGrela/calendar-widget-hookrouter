import { type FC } from 'react';
import IconUp from '../../icons/IconUp';
import IconDown from '../../icons/IconDown';
import { noop } from '../../utils/helpers';

interface IProps {
  className?: string;
  navigateUp: () => void;
  navigateDown: () => void;
}

const CalendarNavigation: FC<IProps> = (props) => {
  const { className, navigateUp = noop, navigateDown = noop } = props;
  return (
    <div className={'month-navigation' + (className ? ' ' + className : '')}>
      <button onClick={navigateUp}>
        <IconUp />
      </button>
      <button onClick={navigateDown}>
        <IconDown />
      </button>
    </div>
  );
};

export default CalendarNavigation;
