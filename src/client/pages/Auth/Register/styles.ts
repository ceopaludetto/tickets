import styled from 'styled-components';
import { Col as BTCol } from 'styled-bootstrap-grid';

import { MapBorder } from '@/client/styles/maps';

export const Col = styled(BTCol)`
  flex: 1;
  border-left: 1px solid ${MapBorder};
`;

export const MaxWidth = styled(BTCol)`
  width: auto;
`;
