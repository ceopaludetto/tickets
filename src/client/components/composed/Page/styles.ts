import { makeStyles, createStyles } from '@material-ui/styles';

interface UseStylesProps {
  hasFooter?: boolean;
}

export const useStyles = makeStyles(
  createStyles({
    header: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '-1rem',
      marginRight: '-1rem',
      marginBottom: (props: UseStylesProps) =>
        props.hasFooter ? '0.5rem' : '1rem',
    },
    content: {
      padding: '0 1rem',
    },
    footer: {
      marginBottom: '1.5rem',
    },
  })
);
