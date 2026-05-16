import React, { useMemo } from 'react';
import { useId } from '@floating-ui/react';
import { usePopoverContext } from './context';
import './PopoverDescription.scss';
import { classNames } from '../../utils/classNames';

/**
 * The description element for the popover.
 * (optional)
 *
 * **Note** It requires the `<Popover />` context
 */
export const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLProps<HTMLParagraphElement>
>(function PopoverDescription(props, ref) {
  const { setDescriptionId } = usePopoverContext();
  const id = useId();

  // Only sets `aria-describedby` on the Popover root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  const updatedProps = useMemo(
    () => ({
      ...props,
      className: classNames('PopoverDescription', props.className),
    }),
    [props],
  );

  return <p {...updatedProps} ref={ref} id={id} />;
});
