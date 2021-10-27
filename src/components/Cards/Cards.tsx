import { useEffect } from 'react';

import Box from '@mui/material/Box';

import activeCasesIcon from 'assets/active_cases.svg';
import casesIcon from 'assets/cases.svg';
import deathsIcon from 'assets/deaths.svg';
import recoveriesIcon from 'assets/recoveries.svg';
// import { CountryData, GlobalData } from 'shared/types'; //! Re-exporting a type when the '--isolatedModules' flag is provided requires using 'export type'
// import { CountryData } from 'shared/types/countryData-interface';
import { GlobalData } from 'shared/types/globalData-interface';

import { CustomCard } from './CustomCard';

interface BadgeProps {
  bgcolor: string;
  label: string;
  text?: string;
}
const Badge = ({ bgcolor, label, text }: BadgeProps) => {
  return (
    <Box
      component='div'
      p={0}
      pt={'1rem'}
    // bgcolor={color}
    >
      <Box
        component='span'
        display='inline-block'
        padding='.25em .4em'
        fontSize='1rem'
        fontWeight='600'
        lineHeight='1'
        textAlign='center'
        whiteSpace='nowrap'
        borderRadius='.25rem'
        color='#fff'
        bgcolor={bgcolor}
      >
        {label}
      </Box>

      <Box
        component='span'
        display='inline-block'
        fontSize='1rem'
        lineHeight='1'
        ml={'0.5rem'}
        color='rgba(0,0,0,.4)'
      >
        {text}
      </Box>
    </Box>
  );
};

interface Props {
  globalData: GlobalData | undefined;
  setIsCardsRendered: (isCardsRendered: boolean) => void;
}

export const Cards = ({ globalData, setIsCardsRendered }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      setIsCardsRendered(true);
    }, 4000);
  }, [setIsCardsRendered]);

  const cases = globalData?.todayCases
    ? ((globalData?.todayCases / globalData?.cases) * 100).toFixed(2)
    : 0;
  const deaths = globalData?.todayDeaths
    ? ((globalData?.todayDeaths / globalData?.deaths) * 100).toFixed(2)
    : 0;
  const recovered = globalData?.todayRecovered
    ? ((globalData?.todayRecovered / globalData?.recovered) * 100).toFixed(2)
    : 0;
  const active = globalData?.active
    ? ((globalData?.todayCases / globalData?.active) * 100).toFixed(2)
    : 0;

  return (
    <div>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            md: 'repeat(2, 1fr)',
            sm: 'repeat(1, 1fr)',
          },
          pt: 8,
        }}
      >
        <CustomCard
          bgcolor='#f3f0ff'
          color='#7950f2'
          cardTitle='Total Cases'
          value={globalData?.cases}
          cardSubtitle={(
            <Badge
              bgcolor='lightslategray'
              label={`${cases} % INC`}
              text={`last checked ${new Date(
                globalData?.updated || 0,
              ).toLocaleString()}`}
            />
          )}
          icon={casesIcon}
        />

        <CustomCard
          bgcolor='#e7f5ff'
          color='#228be6'
          cardTitle='Total Deaths'
          value={globalData?.deaths}
          cardSubtitle={(
            <Badge
              bgcolor='lightslategray'
              label={`${deaths} % INC`}
              text={`last checked ${new Date(
                globalData?.updated || 0,
              ).toLocaleString()}`}
            />
          )}
          icon={deathsIcon}
        />

        <CustomCard
          bgcolor='#d3f9d8'
          color='#40c057'
          cardTitle='Total Recoveries'
          value={globalData?.recovered}
          cardSubtitle={(
            <Badge
              bgcolor='#1bb99a'
              label={`${recovered} % INC`}
              text={`last checked ${new Date(
                globalData?.updated || 0,
              ).toLocaleString()}`}
            />
          )}
          icon={recoveriesIcon}
        />

        <CustomCard
          bgcolor='#fff5f5'
          color='#fa5252'
          cardTitle='ACTIVE CASES'
          value={globalData?.active}
          cardSubtitle={(
            <Badge
              bgcolor='#1bb99a'
              label={`${active} % INC`}
              text={`last checked ${new Date(
                globalData?.updated || 0,
              ).toLocaleString()}`}
            />
          )}
          icon={activeCasesIcon}
        />
      </Box>
    </div>
  );
};
