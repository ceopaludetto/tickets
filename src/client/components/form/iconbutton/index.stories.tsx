import React from 'react';

import { OutlineSettings } from 'mdi-norm';

import { AlignToCenter } from '@/client/utils/storybook.decorators';

import { IconButton } from './index';

export default { title: 'F3Desk|Form/IconButton', component: IconButton, decorators: [AlignToCenter] };

export const normal = () => (
  <IconButton>
    <OutlineSettings />
  </IconButton>
);

export const desabilitado = () => (
  <IconButton disabled>
    <OutlineSettings />
  </IconButton>
);

export const cores = () => (
  <>
    <IconButton color="primary">
      <OutlineSettings />
    </IconButton>
    <IconButton color="secondary">
      <OutlineSettings />
    </IconButton>
    <IconButton color="background">
      <OutlineSettings />
    </IconButton>
    <IconButton color="paper">
      <OutlineSettings />
    </IconButton>
  </>
);
