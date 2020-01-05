import React from 'react';

import { action } from '@storybook/addon-actions';

import { Calendar } from './index';
import { AlignToCenter } from '@/client/utils/storybook.decorators';

export default { title: 'F3Desk|Form/Calendar', component: Calendar, decorators: [AlignToCenter] };

export const normal = () => (
  <Calendar
    onCancel={action('onCancel')}
    onSubmit={action('onSubmit')}
    onChange={action('onChange')}
    onPageChange={action('onPageChange')}
  />
);

export const disableButtons = () => <Calendar showButtons={false} />;

export const disablePast = () => <Calendar disablePast />;

export const disableFuture = () => <Calendar disableFuture />;

export const customMaxDate = () => <Calendar maxDate={new Date('12-31-2021')} />;

export const customMinDate = () => <Calendar minDate={new Date('01-01-2017')} />;
