import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useMeasure, useWindowSize } from 'react-use';

import clsx from 'clsx';

import { Paper } from '@/client/components/layout';
import { AuthRoutes } from '@/client/routes/auth';

import s from './auth.scss';
import c from '@/client/scss/utils.scss';

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
        initial={{
          height: 'auto',
          maxWidth: isRegister ? 900 : 500,
        }}
        animate={{
          height: height + 64,
          maxWidth: isRegister ? 900 : 500,
          transition: { ease: 'easeInOut', duration: 0.2 },
        }}
        className={clsx(c['xs:w-100'], s.paper, {
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
