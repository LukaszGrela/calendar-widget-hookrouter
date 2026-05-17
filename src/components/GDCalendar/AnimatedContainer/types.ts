import type { ReactNode } from 'react';
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import type { SwitchTransitionProps } from 'react-transition-group/SwitchTransition';

export interface IProps {
  children: ReactNode;
  mode?: SwitchTransitionProps['mode'];
  transitionClassNames?: CSSTransitionProps['classNames'];
  timeout?: number;
}
