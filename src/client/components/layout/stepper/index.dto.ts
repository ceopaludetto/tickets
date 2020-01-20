export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  togglePage: (value: number) => void;
  labels: {
    text: string;
    icon: React.ElementType<any>;
  }[];
}
