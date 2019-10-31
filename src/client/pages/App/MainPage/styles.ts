import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 240,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: 290,
    },
    content: {
      marginLeft: 290,
      marginTop: 64,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        marginTop: 56,
      },
    },
  })
);
