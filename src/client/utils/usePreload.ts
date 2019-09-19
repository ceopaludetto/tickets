import { useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import { ProgressContext } from '@/client/providers/progress';
import { useRouter } from './useRouter';
import { preloadRouteComponent } from './preloadRouteComponent';

export function usePreload(
  to: string,
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
) {
  const { toggleIsAnimating } = useContext(ProgressContext);
  const client = useApolloClient();
  const { history } = useRouter();

  return async function handleClick(
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    toggleIsAnimating(true);
    if (e) {
      e.preventDefault();
    }

    await preloadRouteComponent(to, client);
    history.push({
      pathname: to,
    });

    toggleIsAnimating(false);

    if (onClick && e) {
      onClick(e);
    }
  };
}

export { preloadRouteComponent };
