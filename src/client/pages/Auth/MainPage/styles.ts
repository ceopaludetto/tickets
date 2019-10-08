import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

interface UseStylesMainProps {
  isRegister?: boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.paper,
    },
    containerStart: {
      alignItems: 'flex-start',
    },
  })
);
