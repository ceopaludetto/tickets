import React from 'react';
import { FiSettings } from 'react-icons/fi';

import { AlignToCenter } from '@/client/utils/storybook.decorators';

import { IconButton } from './index';

export default { title: 'F3Desk|Form/IconButton', component: IconButton, decorators: [AlignToCenter] };

export const normal = () => (
  <IconButton>
    <FiSettings />
  </IconButton>
);

export const desabilitado = () => (
  <IconButton disabled>
    <FiSettings />
  </IconButton>
);

export const cores = () => (
  <>
    <IconButton color="primary">
      <FiSettings />
    </IconButton>
    <IconButton color="secondary">
      <FiSettings />
    </IconButton>
    <IconButton color="background">
      <FiSettings />
    </IconButton>
    <IconButton color="paper">
      <FiSettings />
    </IconButton>
  </>
);
