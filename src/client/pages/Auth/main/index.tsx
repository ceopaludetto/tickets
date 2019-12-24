import React from 'react';
import clsx from 'clsx';
import { useRouteMatch } from 'react-router-dom';

import c from '@/client/scss/utils.scss';
import s from './auth.scss';
import { Paper } from '@/client/components/layout';
import { AuthRoutes } from '@/client/routes/auth';

export default function AuthMain() {
  const isRegister = useRouteMatch('/auth/register');

  return (
    <div className={clsx(c['xs:d-flex'], c['xs:h-100vh'], c['xs:jc-center'], c['xs:ai-center'])}>
      <Paper className={clsx(isRegister ? c['xs:mw-9'] : c['xs:mw-5'], c['xs:w-100'], s.paper)} elevate>
        <AuthRoutes />
      </Paper>
    </div>
  );
}
