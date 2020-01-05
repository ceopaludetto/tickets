import React from 'react';

import { Switch } from './index';
import { AlignToCenter } from '@/client/utils/storybook.decorators';

export default { title: 'F3Desk|Form/Switch', component: Switch, decorators: [AlignToCenter] };

export const normal = () => <Switch />;

export const label = () => (
  <>
    <Switch label="Teste label em cima" id="teste1" />
  </>
);

export const cores = () => (
  <>
    <Switch color="primary" />
    <Switch color="secondary" />
    <Switch color="paper" />
    <Switch color="background" />
  </>
);
