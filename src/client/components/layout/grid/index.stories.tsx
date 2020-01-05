import React from 'react';

import { Grid } from './index';

import u from '@/client/scss/utils.scss';

export default { title: 'F3Desk|Layout/Grid', component: Grid };

export const normal = () => <Grid />;

export const items = () => (
  <Grid>
    <div className={u['xs:grid-column-3']}>teste</div>
    <div className={u['xs:grid-column-9']}>teste</div>
  </Grid>
);
