import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import CalendarWidget from '../components/CalendarWidget';

class LinkedCalendars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: props.current || moment()
        };
    }

    currentCalendarDateChanged = (date) => {
        // set state - this will move next calendar to be one month forward
        this.setState(() => ({
            current: date.clone()
        }));
    }
    nextCalendarDateChanged = (date) => {
        // set state to be a month less than selected

        this.setState(() => ({
            current: date.clone().subtract(1, 'months')
        }));
    }

    render = () => {
        const { current } = this.state;
        const next = current.clone().add(1, 'months');

        return (
            <section className='linked-calendars'>
                <article>
                    <p>React Calendar Widget example.</p>
                </article>
                <article className='widgets'>
                    <CalendarWidget
                        className='linked currentMonth'
                        todayDate={moment()}
                        currentMonth={current}
                        onDateChanged={this.currentCalendarDateChanged} />
                    <CalendarWidget
                        className='linked nextMonth'
                        todayDate={moment()}
                        currentMonth={next}
                        onDateChanged={this.nextCalendarDateChanged} />
                </article>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                </nav>
            </section>
        );
    }
}

LinkedCalendars.propTypes = {
    current: PropTypes.object
};
export default LinkedCalendars;