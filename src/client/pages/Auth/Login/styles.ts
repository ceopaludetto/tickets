import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      flex: '0 1 600px',
      padding: theme.spacing(6, 6),
    },
    buttonMargin: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(3),
    },
    topOr: {
      marginTop: theme.spacing(3),
    },
  })
);
