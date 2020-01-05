import { useContext } from 'react';
import { useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useIsomorphicLayoutEffect, useToggle, useTimeoutFn } from 'react-use';

import { ProgressContext } from '@/client/components';
import { Actions } from '@/client/services/ducks';

import { preloadRouteComponent } from '../prefetch.routes';
import { useTypedSelector } from './use.typed.selector';

export function usePreload(to?: string, onClick?: (e: React.MouseEvent<any>) => any) {
  const globalState = useTypedSelector(state => state.Global);
  const [hasFinished, setHasFinished] = useToggle(false);
  const { toggleAnimation } = useContext(ProgressContext);
  const { dispatch } = useStore();
  const { push } = useHistory();
  const [isReady, cancel, reset] = useTimeoutFn(() => {
    if (!hasFinished && globalState.loading) toggleAnimation(true);
  }, 250);

  useIsomorphicLayoutEffect(() => {
    if (hasFinished && !globalState.loading) {
      if (isReady() === false) {
        cancel();
      }
      toggleAnimation(false);
      if (to) push(to);
    }
  }, [globalState, hasFinished]);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (to) {
      reset();
      e.preventDefault();
      dispatch(Actions.loadRequest());
      await preloadRouteComponent(dispatch, to);

      if (onClick) {
        onClick(e);
      }

      setHasFinished(true);
    }
  }

  return { handleClick };
}
