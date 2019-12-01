import { StepConnector, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

export const CustomStepConnector = withStyles((theme: Theme) => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: theme.palette.primary.main,
    },
  },
  completed: {
    '& $line': {
      borderColor: theme.palette.primary.main,
    },
  },
  line: {
    borderColor: theme.palette.divider,
    borderTopWidth: 3,
    borderRadius: theme.shape.borderRadius,
  },
}))(StepConnector);
