import { useCallback, useState } from 'react';

export const useControlled = <T, Rest extends unknown[] = []>(
  valueFromProps?: T,
  onChangeFromProps?: (value: T, ...rest: Rest) => void,
  defaultValue?: T
) => {
  const isControlled = valueFromProps !== undefined;

  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue
  );

  const value = (isControlled ? valueFromProps : internalValue) as T;

  const onChange = useCallback(
    (newValue: T, ...rest: Rest) => {
      if (onChangeFromProps) {
        onChangeFromProps(newValue, ...rest);
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }
    },
    [isControlled, onChangeFromProps]
  );

  return { value, onChange, isControlled };
};
