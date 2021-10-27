import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CountUp from 'react-countup';

interface Props {
  bgcolor: string;
  color: string;
  cardTitle: string;
  value: number | undefined;
  cardSubtitle: React.ReactNode;
  // cardSubtitle?: string | undefined | 0;
  icon?: string;
}

export const CustomCard = (props: Props) => {
  const { bgcolor, color, cardTitle, value = 0, cardSubtitle, icon } = props;

  return (
    <Card
      // sx={{ bgcolor, color }}
      sx={{
        bgcolor: '#ffff',
        // padding: '1.25rem',
        boxShadow: '0 0 35px 0 rgb(73 80 87 / 15%)',
        marginBottom: '24px',
        borderRadius: '0.5rem',
        padding: 0,
        mb: 0,
      }}
      elevation={0}
    >
      <CardContent>
        {/*
      https://mui.com/system/basics/#api-tradeoff
      Only the Box, Stack, Typography, and Grid components accept the system properties as props for the above reason */}

        <Box
          component='div'
          display='flex'
          flexDirection='row'
          flexWrap='nowrap'
          justifyContent='space-between'
          alignItems='baseline'
          alignContent='stretch'
          position='relative'
        >
          <Typography
            gutterBottom
            align='left'
            variant='h6'
            mb={0}
          >
            {cardTitle}
          </Typography>

          <img
            src={icon}
            alt='Total Cases'
            style={{
              position: 'absolute',
              right: 0,
            }}
          />
        </Box>

        <Typography
          variant='h3'
          component='div'
        >
          <CountUp
            start={0}
            end={value}
            duration={2}
            separator=','
          />
        </Typography>

        {cardSubtitle}
      </CardContent>
    </Card>
  );
};
