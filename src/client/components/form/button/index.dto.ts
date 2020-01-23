import { LinkProps } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'flat';
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export interface PrefetchLinkProps extends LinkProps {
  variant?: 'contained' | 'flat';
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export type Overload = {
  (props: ButtonProps): JSX.Element;
  (props: PrefetchLinkProps): JSX.Element;
};
