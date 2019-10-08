import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.divider,
      display: 'flex',
      height: 22,
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    active: {
      color: theme.palette.primary.main,
    },
    circle: {
      width: 8,
      height: 8,
      margin: '0 5px',
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 18,
    },
  })
);
