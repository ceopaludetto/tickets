import React from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import blue from '@material-ui/core/colors/blue';
import { createGenerateClassName } from '@material-ui/styles';
import {
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
  IndeterminateCheckBoxRounded,
} from '@material-ui/icons';

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
  overrides: {
    MuiFilledInput: {
      root: {
        borderRadius: '4px!important',
        overflow: 'hidden',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 42,
      },
    },
    MuiTab: {
      root: {
        borderRadius: `4px 4px 0 0`,
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
