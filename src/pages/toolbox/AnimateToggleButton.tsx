import type { FC } from 'react';

export const AnimateToggleButton: FC<{
  onClick: () => void;
  animate?: boolean;
}> = ({ animate, onClick }) => {
  return (
    <button className="ToolboxButton AnimateToggleButton" onClick={onClick}>
      {`${!animate ? 'A' : "Don't a"}nimate`}
    </button>
  );
};
