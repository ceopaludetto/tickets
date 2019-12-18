import styled from '@emotion/styled';
import css from '@styled-system/css';
import { variant } from 'styled-system';

import { Box } from '@/client/components/primitives';
import { Theme } from '@/client/utils/common.dto';
import { genTransition } from '@/client/utils/styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement<{ size: number }>;
  iconPosition?: 'before' | 'after';
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export const Container = styled(Box.withComponent('button'))<Omit<ButtonProps, 'iconPosition'>>(props =>
  css({
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: genTransition(['background-color', 'box-shadow'], [100, 125], 'ease-in-out'),
    color: `${props.variant}.contrast`,
    bg: `${props.variant}.main`,
    '&:hover': {
      bg: `${props.variant}.dark`,
    },
    '&:active, &:focus': {
      bg: `${props.variant}.darkest`,
    },
    '&:focus': {
      outline: 'none',
      boxShadow: `0 0 0 3px ${(props.theme as Theme).colors[props.variant ? props.variant : 'primary'].main}50`,
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
