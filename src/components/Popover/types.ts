import * as React from 'react';
import type { Placement } from '@floating-ui/react';
import type { TUsePopover } from './hooks';

export type TToggleComponentProps = {
  isOpen: boolean;
  id: string;
  open: () => void;
  toggle: () => void;
};

export interface IPopoverOptions<E> {
  /**
   * Should the popover be opened initialy
   */
  initialOpen?: boolean;
  /**
   * Desired placement of the popover, final placement may be different depending on the available space.
   */
  placement?: Placement;
  /**
   * Determines if focus is “modal”, meaning focus is fully trapped inside the floating element and outside content cannot be accessed. This includes screen reader virtual cursors.
   */
  modal?: boolean;
  /**
   * Controlled component - open state
   */
  open?: boolean;

  /**
   * Controlled component - open state callback
   */
  onOpenChange?: (open: boolean) => void;
  // portal component class name
  className?: string;
  /**
   * Extra data to be shared via popover context.
   */
  extras?: E;

  // The axis that runs along the side of the floating element. Represents the distance (gutter or margin) between the reference and floating element.
  offsetValue?: number;
  // The axis that runs along the alignment of the floating element. Represents the skidding between the reference and floating element.
  crossAxisOffset?: number;
}

export type TPopoverContext<T = unknown> =
  | (ReturnType<TUsePopover<T>> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    })
  | null;

export interface IPopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}
