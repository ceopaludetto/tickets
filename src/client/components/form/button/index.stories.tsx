import React from 'react';
import { action } from '@storybook/addon-actions';

import { Button } from './index';

export default { title: 'Button' };

export const normal = () => <Button onClick={action('onClick')}>Hello Button</Button>;

export const tamanhos = () => (
  <>
    <Button size="small">Hello Button</Button>
    <Button size="medium">Hello Button</Button>
    <Button size="large">Hello Button</Button>
  </>
);

export const variacoes = () => (
  <>
    <Button variant="contained">Hello Button</Button>
    <Button variant="outlined">Hello Button</Button>
    <Button variant="flat">Hello Button</Button>
  </>
);

export const todos = () => (
  <>
    <Button variant="outlined" size="small">
      Hello Button
    </Button>
    <Button variant="flat" size="medium">
      Hello Button
    </Button>
    <Button variant="contained" size="large">
      Hello Button
    </Button>
  </>
);
