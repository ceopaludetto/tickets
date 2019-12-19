import React from 'react';
import { FiEye, FiMail } from 'react-icons/fi';
import { action } from '@storybook/addon-actions';

import { Control } from './index';
import { IconButton } from '@/client/components/form';

export default { title: 'Control' };

export const normal = () => <Control onChange={action('onChange')} />;

export const label = () => <Control label="Email" />;

export const append = () => (
  <>
    <Control label="Email" append={<FiMail />} />
    <Control
      label="Password"
      append={
        <IconButton color="negative">
          <FiEye />
        </IconButton>
      }
    />
  </>
);
