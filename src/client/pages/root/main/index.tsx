import React from 'react';
import { Settings } from 'mdi-norm';

import { Button } from '@/client/components/form';

export default function RootMain() {
  return (
    <div>
      <Button size="small">teste</Button>
      <Button size="small" icon={<Settings />}>
        teste
      </Button>
      <Button>teste</Button>
      <Button size="large">teste</Button>
      <Button icon={<Settings />}>teste</Button>
      <Button iconPosition="after" icon={<Settings />}>
        Teste Foda
      </Button>
      <Button icon={<Settings />} size="large">
        Configurações
      </Button>
      <Button variant="outlined" icon={<Settings />} size="large">
        Configurações
      </Button>
      <Button variant="flat" icon={<Settings />} size="small">
        Configurações
      </Button>
    </div>
  );
}
