import React from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import blue from '@material-ui/core/colors/blue';
import { createGenerateClassName } from '@material-ui/styles';
import { CheckBoxOutlineBlankRounded, CheckBoxRounded, IndeterminateCheckBoxRounded } from '@material-ui/icons';

export const theme = createMuiTheme({
  palette: {
    divider: '#dadce0',
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#FFF',
    },
    secondary: blue,
  },
  props: {
    MuiTextField: {
      fullWidth: true,
      variant: 'filled',
      margin: 'normal',
    },
    MuiFormControl: {
      fullWidth: true,
      variant: 'filled',
      margin: 'normal',
    },
    MuiCheckbox: {
      indeterminateIcon: <IndeterminateCheckBoxRounded />,
      icon: <CheckBoxOutlineBlankRounded />,
      checkedIcon: <CheckBoxRounded />,
    },
  },
  shape: {
    borderRadius: 6,
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none!important',
      },
    },
    MuiFilledInput: {
      root: {
        borderRadius: '6px',
        overflow: 'hidden',
      },
      underline: {
        '&::before': {
          display: 'none',
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 42,
      },
    },
    MuiTab: {
      root: {
        borderRadius: '6px',
      },
    },
    MuiTabs: {
      indicator: {
        borderRadius: '25px',
      },
    },
  },
});

export const createClassGenerator = () =>
  createGenerateClassName({
    productionPrefix: '_',
    disableGlobal: true,
  });
