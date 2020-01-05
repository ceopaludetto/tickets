import React from 'react';

import u from '@/client/scss/utils.scss';

import { Grid } from './index';

export default { title: 'F3Desk|Layout/Grid', component: Grid };

export const normal = () => <Grid />;

export const items = () => (
  <Grid>
    <div className={u['xs:grid-column-3']}>teste</div>
    <div className={u['xs:grid-column-9']}>teste</div>
  </Grid>
);
