import React, { useMemo, useReducer, useEffect } from 'react';
import GDClockCase, { TTimeSelectorType } from './GDClockCase';

import './styles/index.scss';
import { valueToString } from './utils';

interface IClockState {
  time: Date;
  type: TTimeSelectorType;
  isAm: boolean;
  is24Hours: boolean;
}
enum ClockActionType {
  TIME = 'clock/change/TIME',
  TYPE = 'clock/change/TYPE',
  IS_AM = 'clock/change/IS_AM',
  IS_24HOURS = 'clock/change/IS_24HOURS',
  STATE = 'clock/change/STATE',
}
interface IClockAction {
  type: ClockActionType;
  value: TTimeSelectorType | Date | boolean | IClockState;
}

function clockReducer(state: IClockState, action: IClockAction): IClockState {
  switch (action.type) {
    case ClockActionType.IS_24HOURS: {
      const flag: boolean = action.value as boolean;
      let type = state.type;
      if (state.type !== 'minutes') {
        type = flag ? '24hours' : 'hours';
      }
      return { ...state, is24Hours: flag, type };
    }
    case ClockActionType.IS_AM: {
      const flag: boolean = action.value as boolean;
      let newTime = state.time;
      if (flag && state.time.getHours() >= 12) {
        newTime = new Date(state.time);
        newTime.setHours(state.time.getHours() - 12);
      }

      if (!flag && state.time.getHours() < 12) {
        newTime = new Date(state.time);
        newTime.setHours(state.time.getHours() + 12);
      }

      return { ...state, isAm: action.value as boolean, time: newTime };
    }
    case ClockActionType.TIME:
      return { ...state, time: action.value as Date };
    case ClockActionType.TYPE:
      return { ...state, type: action.value as TTimeSelectorType };
    default:
      return state;
  }
}

export interface IProps {
  hoursType?: '24hours' | 'hours';
  date: Date;
  className?: string;

  onDateChanged?: (date: Date | undefined) => void;
}
const GDClock: React.FC<IProps> = ({
  className,
  date,
  onDateChanged = () => {},
  hoursType = 'hours',
}: IProps): JSX.Element => {
  const classNameMemo = useMemo((): string => {
    return `GDClock${className ? ` ${className}` : ''}`;
  }, [className]);

  const [{ type, isAm, is24Hours, time }, dispatch] = useReducer(clockReducer, {
    time: new Date(date),
    type: hoursType,
    isAm: date.getHours() < 12,
    is24Hours: hoursType === '24hours',
  });

  const getValue = (time: Date, type: TTimeSelectorType): number => {
    const hours = time.getHours();
    const h =
      hoursType !== '24hours' && hours > 12
        ? time.getHours() - 12
        : time.getHours();
    return type === 'minutes' ? time.getMinutes() : h;
  };

  useEffect((): void => {
    dispatch({
      type: ClockActionType.IS_24HOURS,
      value: hoursType === '24hours',
    });
  }, [hoursType]);

  useEffect((): void => {
    onDateChanged(time);
  }, [time, onDateChanged]);

  return (
    <div className={classNameMemo}>
      <div className="GDClock_Header">
        <button
          className={`GDClock_Hours-btn${
            type !== 'minutes' ? ' selected' : ''
          }`}
          onClick={() => {
            dispatch({ type: ClockActionType.TYPE, value: hoursType });
          }}
        >
          {valueToString(getValue(time, is24Hours ? '24hours' : 'hours'))}
        </button>
        <span>{':'}</span>
        <button
          className={`GDClock_Minutes-btn${
            type === 'minutes' ? ' selected' : ''
          }`}
          onClick={() => {
            dispatch({ type: ClockActionType.TYPE, value: 'minutes' });
          }}
        >
          {valueToString(time.getMinutes())}
        </button>
        {hoursType !== '24hours' && (
          <span className="GDClock_Hours_amPm">
            <button
              className={`GDClock_Hours_am-btn${isAm ? ' selected' : ''}`}
              onClick={() => {
                if (!isAm) {
                  dispatch({
                    type: ClockActionType.IS_AM,
                    value: true,
                  });
                }
              }}
            >
              {'AM'}
            </button>
            <button
              className={`GDClock_Hours_pm-btn${!isAm ? ' selected' : ''}`}
              onClick={() => {
                if (isAm) {
                  dispatch({
                    type: ClockActionType.IS_AM,
                    value: false,
                  });
                }
              }}
            >
              {'PM'}
            </button>
          </span>
        )}
      </div>
      <div className="GDClock_View">
        <GDClockCase
          show={type}
          value={getValue(time, type)}
          interactive={true}
          onChange={(value: number, type: TTimeSelectorType): void => {
            const newTime = new Date(time);
            if (type === 'minutes') {
              newTime.setMinutes(value);
            } else {
              if (hoursType !== '24hours') {
                newTime.setHours(value);
                if (isAm && newTime.getHours() > 12) {
                  newTime.setHours(newTime.getHours() - 12);
                } else if (!isAm && newTime.getHours() <= 12) {
                  newTime.setHours(newTime.getHours() + 12);
                }
              } else {
                newTime.setHours(value);
              }
            }
            dispatch({
              type: ClockActionType.TIME,
              value: newTime,
            });
          }}
        />
      </div>
    </div>
  );
};

export default GDClock;
