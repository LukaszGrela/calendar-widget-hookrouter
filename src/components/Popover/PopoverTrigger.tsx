import React from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { usePopoverContext } from './context';
import type { IPopoverTriggerProps } from './types';

/**
 * The trigger button the popover is attached to. This accepts an `asChild` prop if you want to attach
 * it to a custom element. It also has a `data-state` attached to style based on the open/closed state.
 *
 * **Note** It requires the `<Popover />` context
 */
export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & IPopoverTriggerProps
>(function PopoverTrigger({ children, asChild = false, ...props }, propRef) {
  const context = usePopoverContext();
  const childrenRef = (children as { ref?: React.Ref<unknown> }).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      // False positive: https://github.com/floating-ui/floating-ui/discussions/3405#discussioncomment-14657647
      // eslint-disable-next-line react-hooks/refs
      context.getReferenceProps({
        ref,
        ...props,
        ...Object.assign({}, children.props),
        'data-state': context.open ? 'open' : 'closed',
      } as React.HTMLProps<HTMLElement>)
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      // The user can style the trigger based on the state
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});
