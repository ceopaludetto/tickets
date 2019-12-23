import React from 'react';
import clsx from 'clsx';

import c from '@/client/scss/utils.scss';
import s from './auth.main.scss';
import { Paper } from '@/client/components/layout';
import { AuthRoutes } from '@/client/routes/auth';

export default function AuthMain() {
  return (
    <div className={clsx(c['xs:d-flex'], c['xs:h-100vh'], c['xs:jc-center'], c['xs:ai-center'])}>
      <Paper className={clsx(c['xs:mw-5'], c['xs:w-100'], s.paper)} elevate>
        <AuthRoutes />
      </Paper>
    </div>
  );
}
