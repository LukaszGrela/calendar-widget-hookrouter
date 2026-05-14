import { createContext, useContext } from 'react';
import type {
  TCalendarSelectionActionContext,
  TCalendarSelectionContext,
} from './types';

export const CalendarSelectionContext =
  createContext<TCalendarSelectionContext | null>(null);

export const useCalendarSelectionContext = () => {
  return useContext(CalendarSelectionContext);
};

export const CalendarSelectionActionContext =
  createContext<TCalendarSelectionActionContext | null>(null);

export const useCalendarSelectionActionContext = () => {
  return useContext(CalendarSelectionActionContext);
};
