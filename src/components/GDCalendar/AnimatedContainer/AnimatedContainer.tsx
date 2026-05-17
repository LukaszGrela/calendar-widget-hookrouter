import './AnimatedContainer.scss';
import { type FC, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import type { IProps } from './types';
import { useGDCalendarContext } from '../context/GDCalendarContext';

export const AnimatedContainer: FC<IProps> = ({
  children,
  transitionClassNames,
  mode = 'out-in',
  timeout = 150,
}) => {
  const { currentMonth, direction } = useGDCalendarContext();
  const transitionRef = useRef<HTMLDivElement>(null);
  return (
    <div className={`AnimatedContainer dir-${direction}`}>
      {/* <TransitionGroup className={classNames('SlideAnimation', direction)}> */}
      <SwitchTransition mode={mode}>
        <CSSTransition
          key={`${direction}-${currentMonth.toISOString()}`}
          classNames={transitionClassNames}
          nodeRef={transitionRef}
          timeout={timeout}
        >
          <div className="AnimatedContainer_transition" ref={transitionRef}>
            {children}
          </div>
        </CSSTransition>
      </SwitchTransition>
      {/* </TransitionGroup> */}
    </div>
  );
};
