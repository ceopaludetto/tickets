import React from 'react';
import clsx from 'clsx';
import { useRouteMatch } from 'react-router-dom';
import { useMeasure } from 'react-use';

import c from '@/client/scss/utils.scss';
import s from './auth.scss';
import { Paper } from '@/client/components/layout';
import { AuthRoutes } from '@/client/routes/auth';

export default function AuthMain() {
  const isRegister = useRouteMatch('/auth/register');
  const [ref, { height }] = useMeasure();

  return (
    <div className={clsx(c['xs:d-flex'], c['xs:h-100vh'], c['xs:jc-center'], c['xs:ai-center'])}>
      <Paper
        initial={{
          height: 'auto',
          maxWidth: isRegister ? 900 : 500,
        }}
        animate={{
          height: height + 64,
          maxWidth: isRegister ? 900 : 500,
          transition: { when: 'afterChildren', delay: 0.3, ease: 'easeInOut' },
        }}
        className={clsx(c['xs:w-100'], s.paper)}
        hasInner
        elevate
      >
        <Paper.Inner ref={ref}>
          <AuthRoutes />
        </Paper.Inner>
      </Paper>
    </div>
  );
}
