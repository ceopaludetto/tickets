import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '0 1 800px',
      padding: theme.spacing(6, 6),
    },
    buttons: {
      textAlign: 'right',
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(3),
      '& > button': {
        marginLeft: theme.spacing(1),
      },
    },
    stepperRoot: {
      margin: theme.spacing(0, -2),
    },
  })
);

export const useRenderStyles = makeStyles((theme: Theme) =>
  createStyles({
    fieldContainer: {
      display: 'flex',
      alignItems: 'start',
      flexWrap: 'wrap',
      margin: theme.spacing(0, -2),
    },
    field: {
      flex: 1,
      padding: theme.spacing(0, 2),
      [theme.breakpoints.down('md')]: {
        flex: '0 0 100%',
      },
    },
    paper: {
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(2, 2),
    },
  })
);
