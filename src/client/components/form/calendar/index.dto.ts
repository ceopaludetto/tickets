import { HTMLMotionProps } from 'framer-motion';

export interface CalendarProps extends Omit<HTMLMotionProps<'div'>, 'onChange' | 'onSubmit'> {
  float?: boolean;
  value?: Date;
  showButtons?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (v: Date) => void;
  onCancel?: (e: React.MouseEvent) => void;
  onSubmit?: (d: Date, e: React.MouseEvent) => void;
  onPageChange?: (d: Date, isPreviousAfter: boolean, e: React.MouseEvent) => void;
}
