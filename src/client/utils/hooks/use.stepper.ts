import { useState, useMemo } from 'react';

type UseStepperReturn = [
  () => React.ReactNode,
  {
    currentPage: number;
    nextPage: () => void;
    prevPage: () => void;
    togglePage: (value: number) => (e: React.MouseEvent<any>) => void;
    totalPages: number;
    isFirst: boolean;
    isLast: boolean;
  }
];

export function useStepper(pages: React.ReactNodeArray): UseStepperReturn {
  const [currentPage, setCurrentPage] = useState(0);
  const isFirst = useMemo(() => currentPage === 0, [currentPage]);
  const isLast = useMemo(() => currentPage + 1 === pages.length, [currentPage]);

  function render() {
    return pages[currentPage];
  }

  const nextPage = () => {
    if (currentPage + 1 < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage - 1 > -1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const togglePage = (value: number) => () => {
    if (value < pages.length || value > -1) {
      setCurrentPage(value);
    }
  };

  return [render, { currentPage, nextPage, prevPage, togglePage, totalPages: pages.length, isFirst, isLast }];
}
