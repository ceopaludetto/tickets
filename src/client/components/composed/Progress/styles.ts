import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

interface ContainerProps {
  animationDuration: number;
  isFinished: boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      pointerEvents: 'none',
      position: 'fixed',
      zIndex: 1500,
      top: 0,
      left: 0,
      width: '100%',
      transition: (props: ContainerProps) =>
        theme.transitions.create('opacity', {
          duration: props.animationDuration,
          easing: theme.transitions.easing.easeInOut,
        }),
      opacity: (props: ContainerProps) => (props.isFinished ? 0 : 1),
    },
    barContainer: {
      height: '2px',
      position: 'fixed',
      left: 0,
      top: 0,
      backgroundColor: theme.palette.secondary.main,
      transition: (props: ContainerProps) =>
        theme.transitions.create('width', {
          duration: props.animationDuration,
          easing: theme.transitions.easing.easeInOut,
        }),
    },
    barShadow: {
      display: 'block',
      height: '100%',
      opacity: 1,
      position: 'absolute',
      right: '0px',
      transform: 'rotate(3deg) translate(0px, -4px)',
      width: '100px',
      boxShadow: `0 0 10px ${theme.palette.secondary.main}, 0 0 5px ${theme.palette.secondary.main}`,
    },
  })
);
