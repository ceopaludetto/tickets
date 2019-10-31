import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '0 0 50px',
      height: '100%',
      backgroundColor: theme.palette.primary.main,
    },
  })
);
