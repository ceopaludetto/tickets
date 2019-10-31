import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      width: 'calc(100% - 290px)',
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginLeft: '290px',
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        width: '100%',
      },
    },
    spacer: {
      flex: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  })
);
