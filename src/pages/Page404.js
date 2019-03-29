import React from 'react';
import { A } from 'hookrouter';

const Page404 = () => (
  <section className="page-404">
    <article>
      <h1>404</h1>
      <p>Can&apos;t find what you were after.</p>
    </article>
    <nav>
      <A href="/">Home</A>
    </nav>
  </section>
);

export default Page404;
