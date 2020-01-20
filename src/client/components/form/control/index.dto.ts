import { MaskedInputProps } from 'react-text-mask';

export interface ControlProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Pick<MaskedInputProps, 'guide' | 'mask' | 'placeholderChar' | 'keepCharPositions' | 'pipe' | 'showMask'> {
  label?: string;
  append?: React.ReactElement<any>;
  color?: 'primary' | 'secondary' | 'background' | 'paper';
  error?: boolean;
  helperText?: React.ReactNode;
}
