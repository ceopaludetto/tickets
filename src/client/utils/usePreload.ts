import { useRouter } from './useRouter';
import { preloadRouteComponent } from './preloadRouteComponent';

export function usePreload(
  to: string,
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
) {
  const { history } = useRouter();

  return async function handleClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();

    await preloadRouteComponent(to);
    history.push({
      pathname: to,
    });

    if (onClick) {
      onClick(e);
    }
  };
}
