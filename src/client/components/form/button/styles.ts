import styled from '@emotion/styled';
import css from '@styled-system/css';
import { variant } from 'styled-system';

import { Theme } from '@/client/utils/common.dto';
import { Box } from '@/client/components/primitives';
import { genTransition } from '@/client/utils/styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'flat';
}

const mapPY = {
  small: 1,
  medium: 2,
  large: 3,
};

export const Container = styled(Box.withComponent('button'))<
  Omit<ButtonProps, 'iconPosition' | 'size'> & { forwardedSize: ButtonProps['size'] }
>(
  props =>
    css({
      cursor: 'pointer',
      textTransform: 'uppercase',
      transition: genTransition(['background-color', 'box-shadow'], [100, 125], 'ease-in-out'),
      border: '2px solid transparent',
      borderRadius: 6,
      fontSize: 1,
      fontWeight: 600,
      letterSpacing: 1.5,
      display: 'inline-flex',
      alignItems: 'center',
      px: props.forwardedSize === 'medium' || props.forwardedSize === 'large' ? 3 : 2,
      py: mapPY[props.forwardedSize ? props.forwardedSize : 'small'],
      '&:focus': {
        outline: 'none',
      },
      '-webkit-tap-highlight-color': 'transparent',
    }),
  props =>
    variant({
      variants: {
        contained: {
          color: `${props.color}.contrast`,
          bg: `${props.color}.main`,
          '&:hover': {
            bg: `${props.color}.dark`,
          },
          '&:active, &:focus': {
            bg: `${props.color}.darkest`,
          },
          '&:focus': {
            boxShadow: `0 0 0 3px ${(props.theme as Theme).colors[props.color ? props.color : 'primary'].opacity[1]}`,
          },
        },
        outlined: {
          color: `${props.color}.main`,
          borderColor: `${props.color}.main`,
          bg: 'transparent',
          '&:hover': {
            backgroundColor: (props.theme as Theme).colors[props.color ? props.color : 'primary'].opacity[0],
          },
          '&:active, &:focus': {
            backgroundColor: (props.theme as Theme).colors[props.color ? props.color : 'primary'].opacity[1],
          },
        },
        flat: {
          color: `${props.color}.main`,
          bg: 'transparent',
          '&:hover': {
            backgroundColor: (props.theme as Theme).colors[props.color ? props.color : 'primary'].opacity[0],
          },
          '&:active, &:focus': {
            backgroundColor: (props.theme as Theme).colors[props.color ? props.color : 'primary'].opacity[1],
          },
        },
      },
    })
);
