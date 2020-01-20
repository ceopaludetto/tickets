import React from 'react';
import { Link } from 'react-router-dom';

import { usePreload } from '@/client/utils';

import { ButtonProps, PrefetchLinkProps } from './index.dto';
import { Container } from './styles';

type Overload = {
  (props: ButtonProps): JSX.Element;
  (props: PrefetchLinkProps): JSX.Element;
};

export const Button: Overload = ({ onClick, ...rest }: ButtonProps | PrefetchLinkProps) => {
  const { handleClick } = usePreload((rest as PrefetchLinkProps).to as string, onClick as any);

  if ('to' in rest) {
    const { children, variant = 'contained', color = 'primary', to, ...other } = rest;
    return (
      <Container as={Link} variant={variant} color={color} to={to} onClick={handleClick as any} {...other}>
        {children}
      </Container>
    );
  }

  const { children, variant = 'contained', color = 'primary', type = 'button', ...other } = rest;
  return (
    <Container
      variant={variant}
      color={color}
      onClick={onClick as (e: React.MouseEvent<HTMLButtonElement>) => void}
      type={type}
      {...other}
    >
      {children}
    </Container>
  );
};
