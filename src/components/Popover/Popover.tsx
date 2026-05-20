import type { ReactNode } from 'react';
import type { IPopoverOptions } from './types';
import { usePopover } from './hooks';
import { PopoverContext } from './context';

/**
 * The controller component that manages the popover’s state and provides the API to the rest of the components.
 * It is the context provide for other components.
 *
 * **Note** Required component to use is the component that implements the context and `<FloatingPortal>`,
 * it is already provided with the `<PopoverContent />` component.
 *
 */
export function Popover<E>({
  children,
  modal = false,
  ...restOptions
}: {
  children: ReactNode;
} & IPopoverOptions<E>) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover<E>({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
}
