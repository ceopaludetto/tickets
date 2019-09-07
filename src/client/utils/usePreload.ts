import { useApolloClient } from '@apollo/react-hooks';

import { useRouter } from './useRouter';
import { preloadRouteComponent } from './preloadRouteComponent';

export function usePreload(
  to: string,
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
) {
  const client = useApolloClient();
  const { history } = useRouter();

  return async function handleClick(
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    if (e) {
      e.preventDefault();
    }

    await preloadRouteComponent(to, client);
    history.push({
      pathname: to,
    });

    if (onClick && e) {
      onClick(e);
    }
  };
}

export { preloadRouteComponent };
