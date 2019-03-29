import React from 'react';
import moment from 'moment';
import NavLink from 'react-router-dom/NavLink';

class Home extends React.Component {

    render = () => {
        const now = moment();
        return (
            <section className='home'>
                <article>
                    <p>React Calendar Widget example.</p>
                </article>
                <nav>
                    <NavLink to={`/router-calendar/${now.year()}/${now.month()+1}/${now.date()}`}>Routed Calendar</NavLink>
                    <NavLink to='/linked-calendars'>Linked Calendars</NavLink>
                </nav>
            </section>
        );
    }
}
export default Home;