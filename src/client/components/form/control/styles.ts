import styled from '@emotion/styled';
import css from '@styled-system/css';

import { Theme } from '@/client/utils/common.dto';
import { Box } from '@/client/components/primitives';
import { genTransition } from '@/client/utils/styles';

export interface ControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  block?: boolean;
}

export const Container = styled(Box)<{ block: ControlProps['block'] }>(props =>
  css({
    mb: 3,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'stretch',
    border: '2px solid',
    borderColor: 'background.dark',
    backgroundColor: 'border.main',
    borderRadius: 6,
    maxWidth: props.block ? 'none' : '300px',
    transition: genTransition(['background-color', 'box-shadow', 'border-color'], 125, 'ease-in-out'),
    '&:focus-within': {
      borderColor: 'primary.main',
      backgroundColor: 'border.light',
      boxShadow: `0 0 0 3px ${(props.theme as Theme).colors.primary.opacity[1]}`,
    },
  })
);

export const Label = styled(Box.withComponent('label'))<{ hasFocus: boolean }>(props =>
  css({
    position: 'absolute',
    textTransform: 'uppercase',
    color: props.hasFocus ? 'background.contrast' : 'active.darkest',
    letterSpacing: 1.25,
    fontWeight: 600,
    fontSize: props.hasFocus ? 10 : 13,
    top: props.hasFocus ? '27.5%' : '50%',
    transform: 'translateY(-50%)',
    left: '0.75rem',
    pointerEvents: 'none',
    transition: genTransition(['top', 'font-size', 'color'], 75, 'ease-in'),
  })
);

export const Input = styled(Box.withComponent('input'))<ControlProps & { hasLabel?: boolean }>(props =>
  css({
    border: 'none',
    width: props.block ? '100%' : 'auto',
    padding: props.hasLabel ? '1.45rem 0.75rem 0.55rem' : '1rem 0.75rem',
    fontSize: 14,
    backgroundColor: 'transparent',
    color: 'background.contrast',
    '&:focus': {
      outline: 'none',
    },
  })
);
