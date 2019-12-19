import styled from '@emotion/styled';
import css from '@styled-system/css';

import { Theme } from '@/client/utils/common.dto';
import { Box } from '@/client/components/primitives';
import { genTransition } from '@/client/utils/styles';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'negative';
}

export const Container = styled(Box.withComponent('button'))<
  Omit<IconButtonProps, 'size'> & { forwardedSize: IconButtonProps['size'] }
>(props =>
  css({
    cursor: 'pointer',
    transition: genTransition(['background-color', 'border'], [100, 125], 'ease-in-out'),
    border: '2px solid transparent',
    bg: 'transparent',
    color: `${props.color}.main`,
    borderRadius: 6,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: props.forwardedSize === 'medium' || props.forwardedSize === 'large' ? 2 : 1,
    '&:hover': {
      bg: (props.theme as Theme).colors[props.color ? props.color : 'primary'].opacity[0],
    },
    '&:active, &:focus': {
      bg: (props.theme as Theme).colors[props.color ? props.color : 'primary'].opacity[1],
    },
    '&:focus': {
      outline: 'none',
    },
    '-webkit-tap-highlight-color': 'transparent',
  })
);
