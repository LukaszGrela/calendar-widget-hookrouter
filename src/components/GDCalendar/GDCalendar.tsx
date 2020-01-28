import React from 'react';
import GDCalendarRow from './GDCalendarRow';
import GDCalendarMonthGrid from './GDCalendarMonthGrid';
import { noop, datesSame, weekDays } from './utils';
import SVGIcon from './SVGIcon';
import './styles/index.scss';

export interface IProps {
  className?: string;
  weekdays?: string[];
  // selected date
  date?: Date;
  // reference date for today
  todayDate?: Date;
  // display month reference date
  displayMonth?: Date;
  onDateChanged?: (date: Date | undefined) => void;
}

interface IState {
  currentMonth?: Date;
  selectedDate?: Date;
}
class GDCalendar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const { date, displayMonth = new Date() } = props;
    this.state = {
      currentMonth:
        (date && new Date(date.getFullYear(), date.getMonth(), 1)) ||
        new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1),
      selectedDate: date,
    };
  }

  /**
   * Display previous year
   */
  public prevYear = (): void => {
    this.setState(
      (prevState: IState): Pick<IState, 'currentMonth'> => {
        const date = prevState.currentMonth
          ? new Date(prevState.currentMonth)
          : new Date();
        date.setDate(1); // set it to the first day of that month
        date.setFullYear(date.getFullYear() - 1);

        return { currentMonth: date };
      }
    );
  };

  /**
   * Display next year
   */
  public nextYear = (): void => {
    this.setState(
      (prevState: IState): Pick<IState, 'currentMonth'> => {
        const date = prevState.currentMonth
          ? new Date(prevState.currentMonth)
          : new Date();

        date.setDate(1); // set it to the first day of that month
        date.setFullYear(date.getFullYear() + 1);
        return { currentMonth: date };
      }
    );
  };

  /**
   * Display previous month
   */
  public prevMonth = (): void => {
    this.setState(
      (prevState: IState): Pick<IState, 'currentMonth'> => {
        const date = prevState.currentMonth
          ? new Date(prevState.currentMonth)
          : new Date();
        date.setDate(0); // will set to last day of previous month
        date.setDate(1); // set it to the first day of that month

        return { currentMonth: date };
      }
    );
  };

  /**
   * Display next month
   */
  public nextMonth = (): void => {
    this.setState(
      (prevState: IState): Pick<IState, 'currentMonth'> => {
        const date = prevState.currentMonth
          ? new Date(prevState.currentMonth)
          : new Date();

        date.setMonth(date.getMonth() + 1);
        return { currentMonth: date };
      }
    );
  };

  /**
   * Select requested date
   */
  public selectDate = (date?: Date): void => {
    this.setState(
      (): Pick<IState, 'selectedDate'> => ({
        selectedDate: date,
      }),
      (): void => {
        // auto-navigate when selected not-current month
        if (this.state.selectedDate && this.state.currentMonth) {
          if (
            !datesSame(
              this.state.selectedDate,
              this.state.currentMonth,
              'month'
            )
          ) {
            this.displayMonth(new Date(this.state.selectedDate));
          }
        }

        // inform about date change
        this.props.onDateChanged?.(this.state.selectedDate);
      }
    );
  };

  /**
   * Render requested month
   */
  public displayMonth = (date: Date = new Date()): void => {
    this.setState(
      (): Pick<IState, 'currentMonth'> => ({
        currentMonth: new Date(date),
      })
    );
  };

  /*   componentDidUpdate(prevProps: IProps, prevState: IState): void {
    console.log(
      'GDCalendar.componentDidUpdate',
      prevProps.date,
      this.props.date
    );
    if (!datesSame(prevProps.date, this.props.date, 'date')) {
      // date selected is different
    }
  } */

  render() {
    const {
      weekdays = weekDays('short'),
      onDateChanged = noop,
      todayDate = new Date(),
      className,
    } = this.props;
    const { selectedDate, currentMonth = new Date() } = this.state;
    const classNameMemo = `GDCalendar${className ? ` ${className}` : ''}`;

    return (
      <div className={classNameMemo}>
        <div className="GDCalendar_MonthPage">
          <div className="GDCalendar_Header">
            <button
              className="GDCalendar_PrevMonth-btn"
              onClick={this.prevMonth}
            >
              <SVGIcon icon="left-arrow" />
            </button>
            <span>
              {currentMonth.toLocaleDateString([], {
                month: 'long',
                year:
                  currentMonth.getFullYear() !== todayDate.getFullYear()
                    ? 'numeric'
                    : undefined,
              })}
            </span>
            <button
              className="GDCalendar_NextMonth-btn"
              onClick={this.nextMonth}
            >
              <SVGIcon icon="right-arrow" />
            </button>
          </div>
          <div className="GDCalendar_View">
            <GDCalendarRow className="GDCalendar_WeekHeader" days={weekdays} />
            <GDCalendarMonthGrid
              date={selectedDate}
              monthDate={currentMonth}
              now={todayDate}
              onClick={(date: string | Date): void => {
                if (date instanceof Date) {
                  // console.log('onDateClick', date);
                  this.selectDate(date);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GDCalendar;
