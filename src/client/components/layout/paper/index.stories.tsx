import React from 'react';

import { Paper } from './index';
import { AlignToCenter } from '@/client/utils/storybook.decorators';

export default {
  title: 'F3Desk|Layout/Paper',
  component: Paper,
  decorators: [AlignToCenter],
};

export const normal = () => <Paper />;

export const items = () => <Paper>teste</Paper>;

export const inner = () => (
  <Paper hasInner>
    <Paper.Inner>has Inner</Paper.Inner>
  </Paper>
);

export const elevate = () => <Paper elevate>elevation</Paper>;

export const animate = () => (
  <Paper style={{ userSelect: 'none' }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
    Hover and Tap Me!
  </Paper>
);
