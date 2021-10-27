import * as React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import { AxiosError2 } from 'shared/hooks/http-hook'

interface Props {
  message: AxiosError2;
  onClear: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant='filled'
      {...props}
    />
  );
});

export const SnackbarMUI = ({ message, onClear }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    onClear();
  };

  React.useEffect(() => {
    if (message) setOpen(true);
  }, [message])

  return (
    <Stack
      spacing={2}
      sx={{ width: '100%' }}
    >
      {/* <Button
        variant='outlined'
        onClick={handleClick}
      >
        Open success snackbar
      </Button> */}

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={'top+center'}
      >
        <Alert
          onClose={handleClose}
          severity='error'
          sx={{
            width: '100%',
            // * We have successfully override it globally too in custom theme
            fontSize: '2rem', fontWeight: 500,
            '& .MuiAlert-icon, & .MuiAlert-action .MuiSvgIcon-root': {
              fontSize: '2rem', fontWeight: 500,
              alignSelf: 'center',
            },
            '& .MuiAlert-action .MuiButtonBase-root': {
              alignSelf: 'center',
            }
          }}
        >
          {message}
        </Alert>
      </Snackbar>

    </Stack >
  );
}
