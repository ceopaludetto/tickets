export interface ResponsiveProps<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  flexWrap?: ResponsiveProps<'wrap' | 'nowrap' | 'wrap-reverse'>;
  alignItems?: ResponsiveProps<'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'>;
  justifyContent?: ResponsiveProps<'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between'>;
}

export interface FlexItemProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ResponsiveProps<number>;
}
