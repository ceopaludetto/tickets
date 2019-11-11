import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: theme.spacing(0.75, 2),
      borderRadius: 8,
      '& + $listItem': {
        marginTop: theme.spacing(0.5),
      },
      '&$listItemActive': {
        color: theme.palette.secondary.main,
        '& div span': {
          color: theme.palette.secondary.main,
        },
        '& div svg': {
          fill: theme.palette.secondary.main,
        },
      },
    },
    listItemActive: {},
    listItemText: {
      ...theme.typography.button,
      fontSize: theme.typography.fontSize,
      color: theme.palette.primary.main,
    },
  })
);
