import { ApplicationState } from '@/client/services/ducks';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  error?: string;
  statesToValidate?: ApplicationState[keyof ApplicationState][];
}
