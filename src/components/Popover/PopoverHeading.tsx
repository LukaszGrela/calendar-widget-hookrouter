import React, { useMemo } from 'react';
import { usePopoverContext } from './context';
import { useId } from '@floating-ui/react';
import './PopoverHeading.scss';
import { classNames } from '../../utils/classNames';

/**
 * The heading element for the popover.
 * (optional)
 *
 * **Note** It requires the `<Popover />` context
 */
export const PopoverHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>(function PopoverHeading(props, ref) {
  const { setLabelId } = usePopoverContext();
  const id = useId();

  // Only sets `aria-labelledby` on the Popover root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  const updatedProps = useMemo(
    () => ({
      ...props,
      className: classNames('PopoverHeading', props.className),
    }),
    [props]
  );

  return (
    <h2 {...updatedProps} ref={ref} id={id}>
      {props.children}
    </h2>
  );
});
