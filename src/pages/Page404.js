import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => (
    <section className='page-404'>
        <article>
            <h1>404</h1>
            <p>Can&apos;t find what you were after.</p>
        </article>
        <nav>
            <Link to='/'>Home</Link>
        </nav>
    </section>
);

export default Page404;