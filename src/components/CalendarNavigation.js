import React from 'react';
import PropTypes from 'prop-types';
import IconUp from '../icons/IconUp';
import IconDown from '../icons/IconDown';
import { noop } from '../utils/helpers';

const CalendarNavigation = (props) => {
    const { className, navigateUp = noop, navigateDown = noop } = props;
    return (
        <div className={'month-navigation' + (className ? ' ' + className : '')}>
            <button onClick={navigateUp}><IconUp /></button><button onClick={navigateDown}><IconDown /></button>
        </div>
    );
};

CalendarNavigation.propTypes = {
    className: PropTypes.string,
    navigateUp: PropTypes.func.isRequired,
    navigateDown: PropTypes.func.isRequired
};

export default CalendarNavigation;