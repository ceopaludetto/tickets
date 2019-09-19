import { createContext } from 'react';

interface ContextProps {
  isAnimating: boolean;
  toggleIsAnimating: (nextValue?: boolean) => void;
}

export const ProgressContext = createContext<ContextProps>({
  isAnimating: false,
  toggleIsAnimating: () => false,
});
