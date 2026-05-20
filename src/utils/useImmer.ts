import { type Draft, produce } from 'immer';
import { useState, useCallback } from 'react';

export const useImmer = <T>(
  initialState: T
): [T, (updater: (draft: Draft<T>) => void) => void] => {
  const [state, setState] = useState<T>(initialState);

  const updateState = useCallback((updater: (draft: Draft<T>) => void) => {
    setState((current) => produce(current, updater));
  }, []);

  return [state, updateState];
};
