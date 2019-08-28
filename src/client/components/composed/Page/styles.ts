import styled from 'styled-components';
import { Row } from 'styled-bootstrap-grid';

import { MapBackgroundDarken } from '@/client/styles/maps';

export const Container = styled.div`
  padding-top: 1rem;
  background-color: ${MapBackgroundDarken};
`;

export const Header = styled(Row)`
  margin-bottom: 1rem;
`;
