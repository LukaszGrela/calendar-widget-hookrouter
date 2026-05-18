import type { ChangeEvent, FC } from 'react';
import type { IProps } from '../../components/GDCalendar';

export type TWorkingWeekLengthOption = Exclude<
  IProps['workingWeek'],
  undefined | null
>;

interface WorkingWeekLengthProps {
  value: TWorkingWeekLengthOption;
  onChange: (value: TWorkingWeekLengthOption) => void;
}

type TOptions = {
  value: TWorkingWeekLengthOption;
  label: string;
};

const options: TOptions[] = [
  { label: 'Full week', value: 7 },
  { label: '6 days', value: 6 },
  { label: '5 days', value: 5 },
];

export const WorkingWeekLength: FC<WorkingWeekLengthProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(event.target.value) as unknown as TWorkingWeekLengthOption);
  };

  console.log('WorkingWeekLength', value, options);

  return (
    <fieldset className="WorkingWeekLength">
      <legend>Working week length</legend>
      {options.map((option) => {
        console.log('Option', typeof option.value, typeof value, option.value === value);
        return (
          <label key={`${option.label}-${option.value}`}>
            <input
              type="radio"
              name="workingWeekLength"
              value={option.value}
              checked={value == option.value}
              onChange={handleChange}
            />
            {option.label}
          </label>
        );
      })}
    </fieldset>
  );
};
