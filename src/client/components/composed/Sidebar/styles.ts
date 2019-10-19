import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      paddingRight: theme.spacing(1),
    },
    listItem: {
      padding: theme.spacing(1, 2),
      borderTopRightRadius: 24,
      borderBottomRightRadius: 24,
      '& + div': {
        marginTop: theme.spacing(0.5),
      },
    },
    listItemText: {
      ...theme.typography.button,
      fontSize: theme.typography.fontSize,
      color: theme.palette.primary.main,
    },
  })
);
