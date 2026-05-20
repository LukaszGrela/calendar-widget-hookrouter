import { createContext, useContext } from 'react';
import type {
  TCalendarSelectionActionContext,
  TCalendarSelectionContext,
} from './types';

export const GDCalendarSelectionContext =
  createContext<TCalendarSelectionContext | null>(null);

export const useGDCalendarSelectionContext = () => {
  return useContext(GDCalendarSelectionContext);
};

export const GDCalendarSelectionActionContext =
  createContext<TCalendarSelectionActionContext | null>(null);

export const useGDCalendarSelectionActionContext = () => {
  return useContext(GDCalendarSelectionActionContext);
};
