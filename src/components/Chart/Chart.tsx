import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';

import { LoadingSpinner, SnackbarMUI } from 'components';
import { HttpStatus } from 'shared/constants';
import { useHttpClient } from 'shared/hooks/http-hook';
import { CountryData } from 'shared/types/countryData-interface';

type OptionType = {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
};

interface IndexSignature {
  [key: string]: number;
}

type HistoricalAll = {
  cases: IndexSignature;
  deaths: IndexSignature;
  recovered: IndexSignature;
};

type HistoricalCountry = {
  country: string;
  province: [string];
  timeline: {
    cases: IndexSignature;
    deaths: IndexSignature;
    recovered: IndexSignature;
  };
};

type HistoricalData = HistoricalAll & HistoricalCountry;

type ChartData = {
  cases: {
    label: string[];
    data: number[];
  };
  deaths: {
    label: string[];
    data: number[];
  };
  recovered: {
    label: string[];
    data: number[];
  };
};

interface Props {
  countryData: CountryData[];
}

export const Chart = ({ countryData }: Props) => {
  const [selectedOption, setSelectedOption] = useState<OptionType>();
  const [countryOptions, setCountryOptions] = useState<OptionType[]>([]);

  const { httpState, sendRequest, clearError } = useHttpClient();

  const { status, error } = httpState;

  //    const isIdle = status === httpStatus.IDLE;
  //    const isLoading =
  //       status === httpStatus.IDLE || status === httpStatus.PENDING;
  const isPending = status === HttpStatus.PENDING;

  //    const isResolved = status === httpStatus.RESOLVED;
  const isRejected = status === HttpStatus.REJECTED;

  const [chartData, setChartData] = useState<ChartData>();

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    const country = selectedOption?.value;
    const fetchData = async () => {
      // const url = ' https://disease.sh/v3/covid-19/historical/all?lastdays=all ';
      const url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`;

      try {
        const historicalData = await sendRequest<HistoricalData>(url);

        const formattedData: ChartData = {
          cases: {
            label: [],
            data: [],
          },
          deaths: {
            label: [],
            data: [],
          },
          recovered: {
            label: [],
            data: [],
          },
        };

        if (country == 'all') {
          for (const key in historicalData.cases) {
            formattedData?.cases?.label.push(key);
            formattedData?.cases?.data.push(historicalData.cases[key]);
          }

          for (const key in historicalData.deaths) {
            formattedData?.deaths?.label.push(key);
            formattedData?.deaths?.data.push(historicalData.deaths[key]);
          }

          for (const key in historicalData.recovered) {
            formattedData?.recovered?.label.push(key);
            formattedData?.recovered?.data.push(historicalData.recovered[key]);
          }
        } else {
          for (const key in historicalData.timeline.cases) {
            formattedData?.cases?.label.push(key);
            formattedData?.cases?.data.push(historicalData.timeline.cases[key]);
          }

          for (const key in historicalData.timeline.deaths) {
            formattedData?.deaths?.label.push(key);

            formattedData?.deaths?.data.push(
              historicalData.timeline.deaths[key],
            );
          }

          for (const key in historicalData.timeline.recovered) {
            formattedData?.recovered?.label.push(key);

            formattedData?.recovered?.data.push(
              historicalData.timeline.recovered[key],
            );
          }
        }

        setChartData(formattedData);
      } catch {
        //
      }
    };

    if (country) void fetchData();
  }, [selectedOption, sendRequest]);

  useEffect(() => {
    const countries: OptionType[] = countryData.map((country) => {
      return { value: country.country, label: country.country };
    });

    countries.unshift({ value: 'all', label: 'All Countries' });

    countries.unshift({
      value: '',
      label: 'Select Country or Type Country Name',
      isDisabled: true,
    });

    setCountryOptions(countries);
    setSelectedOption(countries[1]);
  }, [countryData]);

  const handleChange = (Option: any) => {
    setSelectedOption(Option);
  };

  const lineChart = chartData && (
    <Line
      data={{
        labels: chartData?.cases.label,
        datasets: [
          {
            data: chartData?.cases.data,
            label: 'Infected',
            borderColor: '#3333ff',
            fill: false,
          },
          {
            data: chartData.deaths.data,
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: false,
          },
          {
            data: chartData.recovered.data,
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: false,
          },
        ],
      }}
    />
  );

  return (
    <>
      <Stack
        direction='row'
        justifyContent='space-around'
        spacing={2}
        sx={{
          py: 2,
        }}
      >
        <Box component='span'>Select Country</Box>

        <Box sx={{ width: '50%' }}>
          <Select
            value={selectedOption}
            onChange={(option) => handleChange(option)}
            options={countryOptions}
          />
        </Box>
      </Stack>

      {isPending && <LoadingSpinner />}

      {isRejected && (
        <SnackbarMUI
          message={error}
          onClear={clearError}
        />
      )}

      {lineChart}
    </>
  );
};
