import { useContext } from 'react';
import { useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ApiContext } from '@/client/providers/api';
import { ProgressContext } from '@/client/components';
import { preloadRouteComponent } from '../prefetch.routes';

export function usePreload(to?: string, onClick?: (e: React.MouseEvent<any>) => any) {
  const { api } = useContext(ApiContext);
  const { toggleAnimation } = useContext(ProgressContext);
  const { getState, dispatch } = useStore();
  const { push } = useHistory();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (to) {
      let cancel = false;
      setTimeout(() => {
        if (!cancel) {
          toggleAnimation(true);
        }
      }, 200);
      e.preventDefault();
      await preloadRouteComponent({ api, getState, dispatch }, to);

      if (onClick) {
        onClick(e);
      }

      push(to);
      toggleAnimation(false);
      cancel = true;
    }
  }

  return { handleClick };
}
