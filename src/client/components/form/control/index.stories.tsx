import React from 'react';

import { OutlineVisibility } from 'mdi-norm';

import { AlignToCenter } from '@/client/utils/storybook.decorators';

import { IconButton } from '../iconbutton';
import { Control } from './index';

export default { title: 'F3Desk|Form/Control', component: Control, decorators: [AlignToCenter] };

export const normal = () => <Control />;

export const label = () => (
  <>
    <Control label="Email" id="teste1" />
  </>
);

export const cores = () => (
  <>
    <Control color="primary" />
    <Control color="secondary" />
    <Control color="paper" />
    <Control color="background" />
  </>
);

export const append = () => (
  <>
    <Control
      append={
        <IconButton>
          <OutlineVisibility />
        </IconButton>
      }
    />
  </>
);

export const helperText = () => (
  <>
    <Control helperText="helper text" />
    <Control helperText={<a>can be a component too</a>} />
  </>
);

export const error = () => (
  <>
    <Control error helperText="helper error" />
    <Control error label="labelled error" />
  </>
);
