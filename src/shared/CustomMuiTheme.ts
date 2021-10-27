import React from 'react';

import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
// import { Theme, createTheme } from '@material-ui/core/styles';
// import createPalette from '@material-ui/core/styles/createPalette';

//* Approach 1
// export const lightStyles = {
//   isLightTheme: true,
//   typography: {
//     myCustomProperty: 'monospace',
//   },
// };

// export const darkStyles = {
//   isLightTheme: false,
//   typography: {
//     myCustomProperty: 'Georgia',
//     tab: {
//       fontFamily: 'Inconsolata',
//       textTransform: 'none',
//       fontWeight: 700,
//       color: 'white',
//       fontSize: '1rem',
//     },
//   },
// };

// export type CustomTheme = Theme & typeof lightStyles;

// export const appLightTheme = createTheme(
//   {
//     palette: createPalette({}),
//   },
//   lightStyles,
// ) as CustomTheme;

// export const appDarkTheme = createTheme(
//   {
//     palette: createPalette({
//       type: 'dark',
//       text: {
//         primary: secondaryColor,
//       },
//     }),
//     overrides: {
//       MuiButton: {
//         sizeSmall: {
//           color: '#FFF',
//         },
//       },
//     },
//   },
//   lightStyles,
//   darkStyles,
// ) as CustomTheme;
//********************************************************************/

//* Approach 2 -- given in documentation -- https://mui.com/customization/theming/#custom-variables
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    chip?: {
      color: string;
      expandIcon?: {
        background: string;
        color: string;
      };
    };
  }
  interface Palette {
    chip?: {
      color: string;
      expandIcon?: {
        background: string;
        color: string;
      };
    };
  }
}

// https://www.bergqvist.it/blog/2020/6/26/extending-theme-material-ui-with-typescript
declare module '@mui/material/styles/createTypography' {
  interface Typography {
    tab?: {
      fontFamily?: string;
      textTransform?: string;
      fontWeight?: number;
      color?: string;
      fontSize?: string;
    };
  }

  interface TypographyOptions {
    tab?: {
      fontFamily?: string;
      textTransform?: string;
      fontWeight?: number;
      color?: string;
      fontSize?: string;
    };
  }
}

/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

FONT SIZE SYSTEM (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
*/

// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

const mainColor = '#1976d2';

const accentColor = '#9c27b0';

const greyColor = '#343a40';
const greyColorSubTitle = '#868686';
const bodyColor = '';

// A custom theme for this app
export const CustomMuiTheme = createTheme({
  palette: {
    // mode: 'dark',
    mode: 'light',
    primary: {
      main: mainColor,
    },
    secondary: {
      main: accentColor,
    },
    error: {
      main: red.A400,
    },
    // background: {
    //   default: bodyColor,
    // },
    // text: {
    //   primary: '#212529',
    // },
    // chip:{
    //   color: 'red'
    // }
  },

  typography: {
    // fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontFamily: `'Calibre Web', system, -apple-system, BlinkMacSystemFont,
    'Helvetica Neue', 'Lucida Grande'`,
    // fontSize: 14,
    // fontWeightLight: 300,
    // fontWeightRegular: 400,
    // fontWeightMedium: 500,

    tab: {
      // fontFamily: 'Inconsolata',
      fontFamily: 'IBM Plex Mono, sans-serif',
      textTransform: 'none',
      fontWeight: 400,
      color: 'white',
      fontSize: '1rem',
      // lineHeight:
    },
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: 1,
      lineHeight: 1.15,
      color: greyColor,
    },
    h2: {
      fontFamily: 'IBM Plex Mono, sans-serif',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '3.875rem',
      lineHeight: '5rem',
      letterSpacing: '0.05em',
    },
    h3: {
      fontSize: '40px',
      fontWeight: 600,
      color: greyColor,
    },
    h4: {
      fontFamily: 'Inconsolata',
      fontSize: '1.75rem',
      color: accentColor,
      fontWeight: 700,
    },
    h6: {
      // fontFamily: 'Inconsolata',
      color: 'rgba(0,0,0,.4)',
      fontSize: '1rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      lineHeight: '1.5',
      letterSpacing: 0.5,
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 400,
      color: greyColorSubTitle,
      lineHeight: '1.5',
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 300,
      color: 'rgba(0,0,0,.4)',
    },
    body1: {
      fontSize: '1.25rem',
      color: greyColorSubTitle,
      fontWeight: 300,
    },
    body2: {
      fontSize: '0.625rem',
      // color: '#868e96',
      fontWeight: 300,
    },
    caption: {
      fontSize: '1rem',
      fontWeight: 300,
      color: greyColorSubTitle,
    },
  },
  //    https://mui.com/customization/theme-components/

  // components: {
  //   // Name of the component
  // * We have successfully override it using sx in CustomSnackbar component
  //   MuiAlert: {
  //     styleOverrides: {
  //       // Name of the slot
  //       root: {
  //         fontSize: '3rem',
  //         fontWeight: 600,
  //       },
  //       icon: {
  //         fontSize: '3rem',
  //         fontWeight: 600,
  //         alignSelf: 'center',
  //       },
  //       action: {
  //         '& .MuiSvgIcon-root': {
  //           fontSize: '3rem',
  //           fontWeight: 600,
  //           alignSelf: 'center',
  //         },
  //       },
  //     },
  //   },
  // },
  // * -----------
});
