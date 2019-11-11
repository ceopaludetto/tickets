import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: '0 0 50px',
      height: '100%',
      backgroundColor: theme.palette.secondary.main,
      flexDirection: 'column',
      padding: theme.spacing(0, 1),
    },
    firstOptions: {
      paddingTop: theme.spacing(1),
      flex: 1,
    },
    lastOptions: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    icon: {
      color: theme.palette.secondary.contrastText,
      '& + $icon': {
        marginTop: theme.spacing(0.75),
      },
    },
    divider: {
      height: '2px',
      backgroundColor: theme.palette.secondary.contrastText,
      borderRadius: theme.shape.borderRadius,
      margin: theme.spacing(1.5, 0),
    },
  })
);
