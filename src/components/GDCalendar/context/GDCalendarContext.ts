import React from 'react';
import type { TCalendarContext } from './types';

export const GDCalendarContext = React.createContext<TCalendarContext | null>(
  null
);

export const useGDCalendarContext = () => {
  const context = React.useContext(GDCalendarContext);

  if (context === null) {
    throw new Error(
      'To use GDCalendar components wrap it with the <GDCalendarProvider />'
    );
  }

  return context;
};
