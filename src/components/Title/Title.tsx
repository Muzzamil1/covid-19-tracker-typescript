import Typography from '@mui/material/Typography';

interface Props { }

export const Title = (props: Props) => {
  return (
    <>
      <Typography gutterBottom align='left' variant='h1' mb={0}>
        <span role='img' aria-label='virus icon'>
          🦠
        </span>
        COVID-19 Tracker
      </Typography>

      <Typography gutterBottom align='left' variant='subtitle1'>
        Track the spread of the Coronavirus Covid-19 outbreak
      </Typography>
    </>
  );
};
