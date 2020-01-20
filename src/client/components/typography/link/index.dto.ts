import { LinkProps as RouterLinkProps } from 'react-router-dom';

export interface LinkProps extends RouterLinkProps {
  gutterBottom?: boolean;
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}
