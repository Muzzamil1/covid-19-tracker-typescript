import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingSpinner = () => {
  return (
    <Backdrop
      open
      sx={{
        color: 'yellow',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};
