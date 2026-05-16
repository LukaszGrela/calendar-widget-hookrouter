import React from 'react';
import { usePopoverContext } from './context';

/**
 * The close button for the popover when using `modal` focus management.
 * (optional)
 *
 * **Note** It requires the `<Popover modal />` context
 */
export const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function PopoverClose(props, ref) {
  const { setOpen } = usePopoverContext();
  return (
    <button
      type="button"
      ref={ref}
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        setOpen(false);
      }}
    />
  );
});
