import type { FC } from 'react';

export const MondayFirstButton: FC<{
  onClick: () => void;
  mondayFirst?: boolean;
}> = ({ mondayFirst, onClick }) => {
  return (
    <button className="ToolboxButton MondayFirstButton" onClick={onClick}>
      {`Set ${!mondayFirst ? 'Monday' : 'Sunday'} first`}
    </button>
  );
};
