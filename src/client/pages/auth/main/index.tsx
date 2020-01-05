import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useMeasure, useWindowSize } from 'react-use';

import clsx from 'clsx';

import { Paper } from '@/client/components/layout';
import { AuthRoutes } from '@/client/routes/auth';
import c from '@/client/scss/utils.scss';

import s from './auth.scss';

export default function AuthMain() {
  const { height: windowHeight } = useWindowSize();
  const [ref, { height }] = useMeasure();
  const isRegister = useRouteMatch('/auth/register');
  const isGTDevice = useMemo(() => height + 64 > windowHeight, [height, windowHeight]);

  return (
    <div
      className={clsx(c['xs:d-flex'], c['xs:h-100vh'], c['xs:jc-center'], c['xs:ai-center'], s.root, {
        [s.register]: isRegister,
      })}
    >
      <Paper
        className={clsx(c['xs:w-100'], isRegister ? c['xs:mw-9'] : c['xs:mw-5'], s.paper, {
          [s['paper-force']]: isGTDevice,
        })}
        elevate={!isRegister}
        hasInner
      >
        <Paper.Inner ref={ref}>
          <AuthRoutes />
        </Paper.Inner>
      </Paper>
    </div>
  );
}
