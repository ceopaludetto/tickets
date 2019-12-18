import styled from '@emotion/styled';
import css from '@styled-system/css';
import { variant } from 'styled-system';

import { Box } from '@/client/components/primitives';
import { Theme } from '@/client/utils/common.dto';
import { genTransition } from '@/client/utils/styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement<{ size: number }>;
  iconPosition?: 'before' | 'after';
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'flat';
}

export const Container = styled(Box.withComponent('button'))<Omit<ButtonProps, 'iconPosition'>>(
  css({
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: genTransition(['background-color', 'box-shadow'], [100, 125], 'ease-in-out'),
    border: '1px solid transparent',
    '&:focus': {
      outline: 'none',
    },
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
          border: '1px solid',
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

export const Icon = styled(Box)<{ variant: ButtonProps['iconPosition']; size: ButtonProps['size'] }>(props =>
  variant({
    variants: {
      before: {
        order: -1,
        mr: ['small', 'medium', 'large'].indexOf(props.size ? props.size : 'small') + 1,
      },
      after: {
        order: 13,
        ml: ['small', 'medium', 'large'].indexOf(props.size ? props.size : 'small') + 1,
      },
    },
  })
);
