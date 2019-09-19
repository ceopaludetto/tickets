import styled from 'styled-components';
import { Col as BTCol } from 'styled-bootstrap-grid';

import { mapBorder } from '@/client/styles/maps';

export const Col = styled(BTCol)`
  flex: 1;
  border-left: 1px solid ${mapBorder};
`;

export const MaxWidth = styled(BTCol)`
  width: auto;
`;
