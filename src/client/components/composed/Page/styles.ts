import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

interface UseStylesProps {
  notFluid?: boolean;
  hasFooter?: boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: (props: UseStylesProps) => theme.spacing(props.notFluid ? 0 : 3, 3, 2, 3),
      maxWidth: (props: UseStylesProps) => (props.notFluid ? 'none' : 'inherit'),
      width: '100%',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(-1),
      marginRight: theme.spacing(-1),
      marginBottom: (props: UseStylesProps) => (props.hasFooter ? theme.spacing(0.5) : theme.spacing(1)),
    },
    content: {
      padding: theme.spacing(0, 1),
    },
    full: {
      flex: 1,
    },
    footer: {
      marginBottom: theme.spacing(1.5),
    },
  })
);
