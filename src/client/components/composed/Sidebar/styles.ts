import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      paddingRight: theme.spacing(1.5),
      paddingLeft: theme.spacing(1.5),
      height: '100%',
      flex: 1,
    },
    root: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
  })
);
