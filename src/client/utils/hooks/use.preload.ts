import { useContext } from 'react';
import { useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ApiContext } from '@/client/providers/api';
import { preloadRouteComponent } from '../prefetch.routes';

export function usePreload(to?: string, onClick?: (e: React.MouseEvent<any>) => any) {
  const { api } = useContext(ApiContext);
  const { getState, dispatch } = useStore();
  const { push } = useHistory();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (to) {
      e.preventDefault();
      await preloadRouteComponent({ api, getState, dispatch }, to);

      if (onClick) {
        onClick(e);
      }

      push(to);
    }
  }

  return { handleClick };
}
