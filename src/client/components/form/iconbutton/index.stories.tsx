import React from 'react';
import { FiSettings } from 'react-icons/fi';

import { IconButton } from './index';

export default { title: 'IconButton' };

export const normal = () => (
  <IconButton>
    <FiSettings />
  </IconButton>
);

export const tamanhos = () => (
  <>
    <IconButton size="small">
      <FiSettings />
    </IconButton>
    <IconButton size="medium">
      <FiSettings />
    </IconButton>
    <IconButton size="large">
      <FiSettings />
    </IconButton>
  </>
);

export const cores = () => (
  <>
    <IconButton color="primary">
      <FiSettings />
    </IconButton>
    <IconButton color="secondary">
      <FiSettings />
    </IconButton>
    <IconButton color="negative">
      <FiSettings />
    </IconButton>
  </>
);
