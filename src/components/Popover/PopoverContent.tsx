import React, { useMemo } from 'react';
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import { usePopoverContext } from './context';
import './PopoverContent.scss';
import { classNames } from '../../utils/classNames';

/**
 * The popover element, which can contain any children (React nodes).
 *
 * (required)
 * **Note** It requires the `<Popover />` context
 */
export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function PopoverContent({ style, ...props }, propRef) {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  const updatedProps = useMemo(
    () => ({
      ...props,
      className: classNames(
        'PopoverContent',
        props.className,
        context.className
      ),
    }),
    [context.className, props]
  );

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext} modal={context.modal}>
        <div
          ref={ref}
          style={{ ...context.floatingStyles, ...style }}
          aria-labelledby={context.labelId}
          aria-describedby={context.descriptionId}
          {...context.getFloatingProps(updatedProps)}
        >
          {props.children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});
