import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      background: theme.palette.background.default,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 240,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: 290,
      borderRight: 'none',
      overflowX: 'hidden',
      zIndex: 1499,
      '&::before': {
        content: '""',
        right: '-1px',
        top: 0,
        height: '100%',
        width: '1px',
        boxShadow: theme.shadows[1],
        position: 'absolute',
        backgroundColor: 'transparent',
      },
    },
    content: {
      marginLeft: 290,
      marginTop: 64,
      width: 'calc(100% - 290px)',
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        marginTop: 56,
        width: '100%',
      },
    },
  })
);
