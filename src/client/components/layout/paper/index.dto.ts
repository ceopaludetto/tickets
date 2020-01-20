import { HTMLMotionProps } from 'framer-motion';

export interface PaperProps extends HTMLMotionProps<'div'> {
  border?: boolean;
  elevate?: boolean;
  hasInner?: boolean;
  small?: boolean;
}
