import React, { type FC } from 'react';
import { Router } from './pages/Router';

const App: FC = () => {
  return (
    //TODO: basename="/react/calendar-widget"
    <React.Fragment>
      <header>
        <h1>Calendar Widget</h1>
      </header>
      <Router />
      <footer>
        <div className="credits">
          Arrow Up/Down by Design Effectz from the Noun Project
        </div>
      </footer>
    </React.Fragment>
  );
};

export default App;
