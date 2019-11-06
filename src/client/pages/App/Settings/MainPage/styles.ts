import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fieldGroup: {
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      margin: theme.spacing(0, -1),
    },
    field: {
      padding: theme.spacing(0, 1),
      flex: 1,
      [theme.breakpoints.down('md')]: {
        flex: '0 0 100%',
      },
    },
    alignRight: {
      marginTop: theme.spacing(1),
      textAlign: 'right',
    },
    alignCenter: {
      textAlign: 'center',
    },
    divider: {
      margin: theme.spacing(3, 0),
    },
    paper: {
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(2, 2),
    },
    paperOrder: {
      [theme.breakpoints.down('md')]: {
        order: -1,
        marginBottom: theme.spacing(1),
      },
    },
  })
);
