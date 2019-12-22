import React from 'react';
import { FiSettings } from 'react-icons/fi';

import { Button, Control, IconButton, Switch } from '@/client/components/form';
import { Paper, Row } from '@/client/components/layout';

export default function RootMain() {
  return (
    <div>
      <Button>top</Button>
      <Button color="secondary">top</Button>
      <Button color="paper">top</Button>
      <Control label="Email" />
      <Control
        label="Senha"
        append={
          <IconButton>
            <FiSettings />
          </IconButton>
        }
      />
      <Switch />
      <Switch label="teste" id="tema" />
      <Switch color="secondary" />
      <Paper elevate hoverable>
        <Row justify="center" align="flex-end">
          teste
        </Row>
      </Paper>
    </div>
  );
}
