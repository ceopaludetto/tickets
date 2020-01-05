import React from 'react';

import { Checkbox } from './index';
import { AlignToCenter } from '@/client/utils/storybook.decorators';

export default { title: 'F3Desk|Form/Checkbox', component: Checkbox, decorators: [AlignToCenter] };

export const normal = () => <Checkbox />;

export const label = () => (
  <>
    <Checkbox label="Teste label em cima" id="teste1" />
    <Checkbox label="Teste label do lado" labelPlacement="right" id="teste2" />
  </>
);

export const cores = () => (
  <>
    <Checkbox color="primary" />
    <Checkbox color="secondary" />
    <Checkbox color="paper" />
    <Checkbox color="background" />
  </>
);
