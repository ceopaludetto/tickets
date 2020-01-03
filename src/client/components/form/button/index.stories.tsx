import React from 'react';

import { AlignToCenter } from '@/client/utils/storybook.decorators';

import { Button } from './index';

export default { title: 'F3Desk|Form/Button', component: Button, decorators: [AlignToCenter] };

export const normal = () => <Button>Hello Button</Button>;

export const desabilitado = () => <Button disabled>Hello Button</Button>;

export const cores = () => (
  <>
    <Button color="primary">Hello Button</Button>
    <Button color="secondary">Hello Button</Button>
    <Button color="background">Hello Button</Button>
    <Button color="paper">Hello Button</Button>
  </>
);

export const variacoes = () => (
  <>
    <Button variant="contained">Hello Button</Button>
    <Button variant="flat">Hello Button</Button>
  </>
);
