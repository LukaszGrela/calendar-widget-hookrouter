import type { ChangeEvent, FC } from 'react';

type THolidayEntry = {
  label: string;
  day: number;
  month: number;
  year?: number;
};
export type THolidaysMap = Map<string, THolidayEntry[]>;

const polishHolidays: THolidaysMap = new Map([
  [
    '*-0-1',
    [
      {
        label: 'Nowy Rok',
        day: 1,
        month: 0,
      },
    ],
  ],
  [
    '*-0-6',
    [
      {
        label: 'Trzech Króli',
        day: 6,
        month: 0,
      },
    ],
  ],
  [
    '*-4-1',
    [
      {
        label: 'Święto Pracy',
        day: 1,
        month: 4,
      },
    ],
  ],
  [
    '*-4-3',
    [
      {
        label: 'Święto Konstytucji 3 Maja',
        day: 3,
        month: 4,
      },
    ],
  ],
  [
    '*-7-15',
    [
      {
        label: 'Wniebowzięcie Najświętszej Maryi Panny',
        day: 15,
        month: 7,
      },
    ],
  ],
  [
    '*-10-1',
    [
      {
        label: 'Wszystkich Świętych',
        day: 1,
        month: 10,
      },
    ],
  ],
  [
    '*-10-11',
    [
      {
        label: 'Narodowe Święto Niepodległości',
        day: 11,
        month: 10,
      },
    ],
  ],
  [
    '*-11-24',
    [
      {
        label: 'Wigilia Bożego Narodzenia',
        day: 24,
        month: 11,
      },
    ],
  ],
  [
    '*-11-25',
    [
      {
        label: 'Pierwszy dzień Bożego Narodzenia',
        day: 25,
        month: 11,
      },
    ],
  ],
  [
    '*-11-26',
    [
      {
        label: 'Drugi dzień Bożego Narodzenia',
        day: 26,
        month: 11,
      },
    ],
  ],
]);

const englishHolidays: THolidaysMap = new Map([
  // Stałe daty (bez roku)
  ['*-0-1', [{ label: 'Nowy Rok', day: 1, month: 0 }]],
  ['*-0-6', [{ label: 'Objawienie Pańskie (Trzech Króli)', day: 6, month: 0 }]],
  ['*-1-14', [{ label: 'Walentynki (kulturalne)', day: 14, month: 1 }]],
  ['*-2-17', [{ label: 'Dzień Świętego Patryka', day: 17, month: 2 }]],
  ['*-3-1', [{ label: 'Dzień św. Dawida (Walia)', day: 1, month: 3 }]],
  ['*-3-25', [{ label: 'ANZAC Day', day: 25, month: 3 }]],
  ['*-6-1', [{ label: 'Dzień Kanady', day: 1, month: 6 }]],
  ['*-6-4', [{ label: 'Dzień Niepodległości (USA)', day: 4, month: 6 }]],
  ['*-9-31', [{ label: 'Halloween (kulturalne)', day: 31, month: 9 }]],
  [
    '*-11-24',
    [
      {
        label:
          'Wigilia Bożego Narodzenia (obserwowane w niektórych miejscach pracy)',
        day: 24,
        month: 11,
      },
    ],
  ],
  ['*-11-25', [{ label: 'Boże Narodzenie', day: 25, month: 11 }]],
  [
    '*-11-26',
    [{ label: 'Drugi dzień świąt / Boxing Day', day: 26, month: 11 }],
  ],
  ['*-11-31', [{ label: 'Sylwester (obserwowane)', day: 31, month: 11 }]],

  // Ruchome — klucze zawierają rok 2026 i wpisy mają year: 2026
  [
    '2026-3-4',
    [{ label: 'Wielkanoc (Easter Sunday)', day: 4, month: 3, year: 2026 }],
  ], // 4 Apr 2026
  [
    '2026-4-4',
    [
      {
        label: 'Early May Bank Holiday (pierwszy poniedziałek maja — UK)',
        day: 4,
        month: 4,
        year: 2026,
      },
    ],
  ], // 4 May 2026
  [
    '2026-4-25',
    [
      {
        label: 'Spring Bank Holiday (ostatni poniedziałek maja — UK)',
        day: 25,
        month: 4,
        year: 2026,
      },
    ],
  ], // 25 May 2026
  [
    '2026-5-21',
    [{ label: 'Dzień Ojca (UK, kulturalne)', day: 21, month: 5, year: 2026 }],
  ], // 21 Jun 2026
  [
    '2026-7-31',
    [
      {
        label:
          'Summer Bank Holiday (ostatni poniedziałek sierpnia — England & Wales)',
        day: 31,
        month: 7,
        year: 2026,
      },
    ],
  ], // 31 Aug 2026
  [
    '2026-8-7',
    [
      {
        label: 'Labour Day (pierwszy poniedziałek września — US/Canada)',
        day: 7,
        month: 8,
        year: 2026,
      },
    ],
  ], // 7 Sep 2026
  [
    '2026-9-12',
    [
      {
        label: 'Canadian Thanksgiving (Drugi poniedziałek października)',
        day: 12,
        month: 9,
        year: 2026,
      },
      {
        label:
          "Columbus Day / Indigenous Peoples' Day (Drugi poniedziałek października — USA)",
        day: 12,
        month: 9,
        year: 2026,
      },
    ],
  ],
  [
    '2026-10-11',
    [
      {
        label: 'Dzień Pamięci / Veterans Day (11 listopada — obserwowane)',
        day: 11,
        month: 10,
        year: 2026,
      },
    ],
  ], // 11 Nov 2026
  [
    '2026-10-26',
    [
      {
        label: 'Thanksgiving (Czwarte czwartek listopada — USA)',
        day: 26,
        month: 10,
        year: 2026,
      },
    ],
  ], // 26 Nov 2026
]);

console.log('polishHolidays', polishHolidays);

const optionsValueMap = {
  polish: polishHolidays,
  anglosaxon: englishHolidays,
};
export type THolidaysKeys = keyof typeof optionsValueMap | 'none';
type TOptions = { label: string; value: THolidaysKeys };
const options: TOptions[] = [
  { label: 'Polish holidays', value: 'polish' },
  { label: 'Anglosaxon holidays', value: 'anglosaxon' },
  { label: 'No holidays', value: 'none' },
];

interface IHolidaySelectorProps {
  value: THolidaysKeys;
  onChange: (value: THolidaysKeys, map: THolidaysMap | null) => void;
}

export const HolidaySelector: FC<IHolidaySelectorProps> = ({
  onChange,
  value,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value as THolidaysKeys;
    if (key !== 'none') {
      onChange(key, optionsValueMap[key]);
    } else {
      onChange('none', null);
    }
  };

  return (
    <fieldset className="HolidaySelector">
      <legend>Show holidays</legend>
      {options.map((option) => {
        return (
          <label key={`${option.label}-${option.value}`}>
            <input
              type="radio"
              name="holidaySelector"
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
