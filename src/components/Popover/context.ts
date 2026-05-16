import React from 'react';
import type { TPopoverContext } from './types';

export const PopoverContext = React.createContext<TPopoverContext>(null);

export const usePopoverContext = <T>() => {
  const context = React.useContext(PopoverContext) as TPopoverContext<T>;

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context;
};
