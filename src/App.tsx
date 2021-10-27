import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';

import {
  Title,
  Cards,
  LoadingSpinner,
  SnackbarMUI,
  CountryBreakdownTable,
  Chart,
} from 'components';
import { HttpStatus } from 'shared/constants';
import { CustomMuiTheme } from 'shared/CustomMuiTheme';
import { useHttpClient } from 'shared/hooks/http-hook';
// import { CountryData, GlobalData } from 'shared/types';//! Re-exporting a type when the '--isolatedModules' flag is provided requires using 'export type'
import { CountryData } from 'shared/types/countryData-interface';
import { GlobalData } from 'shared/types/globalData-interface';

interface CombineData {
  globalData: GlobalData;
  countryData: CountryData[];
}

function App() {
  const { httpState, sendRequest, clearError } = useHttpClient();

  const { status, error } = httpState;

  //    const isIdle = status === httpStatus.IDLE;
  //    const isLoading =
  //       status === httpStatus.IDLE || status === httpStatus.PENDING;
  const isPending = status === HttpStatus.PENDING;

  //    const isResolved = status === httpStatus.RESOLVED;
  const isRejected = status === HttpStatus.REJECTED;

  const [data, setData] = useState<CombineData>();

  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isCardsRendered, setIsCardsRendered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const globalURL = 'https://disease.sh/v3/covid-19/all';
      const countryURL = 'https://disease.sh/v3/covid-19/countries';

      try {
        const globalData = await sendRequest<GlobalData>(globalURL);
        // console.log('globalData', globalData);
        const countryData = await sendRequest<CountryData[]>(countryURL);
        setIsDataLoading(false);

        setData({
          globalData,
          countryData,
        });
      } catch {
        setIsDataLoading(false);
      }
    };

    void fetchData();
  }, [sendRequest]);

  return (
    <div className='App'>
      <ThemeProvider theme={CustomMuiTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

        <CssBaseline />

        <Container
          // maxWidth='md'
          maxWidth={false}
          sx={{ height: '100vh', maxWidth: '65rem', pt: '8rem' }}
        >
          {/* {isPending && <LoadingSpinner />} */}

          {isDataLoading && <LoadingSpinner />}

          {isRejected && (
            <SnackbarMUI
              message={error}
              onClear={clearError}
            />
          )}

          {/*
            https://mui.com/system/basics/#api-tradeoff
            Only the Box, Stack, Typography, and Grid components accept the system properties as props for the above reason */}

          {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', maxWidth: '65rem', pt: '8rem' }} /> */}

          <Title />

          <Cards
            globalData={data?.globalData}
            setIsCardsRendered={setIsCardsRendered}
          />

          <Box pt={8} />

          <CountryBreakdownTable items={data?.countryData || []} />

          <Box
            component={Paper}
            mt={8}
            elevation={5}
          >
            {
              isCardsRendered && <Chart countryData={data?.countryData || []} />
            }
          </Box>

          <Box pt={8} />
        </Container>
      </ThemeProvider>
      ,
    </div>
  );
}

export default App;
