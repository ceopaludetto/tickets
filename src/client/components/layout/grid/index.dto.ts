export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}
