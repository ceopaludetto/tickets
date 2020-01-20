export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement<{ size: number }>;
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}
