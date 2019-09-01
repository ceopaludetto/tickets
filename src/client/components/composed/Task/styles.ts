import styled, { css } from 'styled-components';

import { Paper } from '@/client/components/layout';
import {
  MapBorder,
  MapBackground,
  MapContrastText,
} from '@/client/styles/maps';
import { radius } from '@/client/styles/utils';

export const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${MapBorder};
`;

export const Body = styled.div`
  padding: 1rem;
  margin-top: -1.5rem;
`;

interface ContainerProps {
  isDragging?: boolean;
}

export const Container = styled(Paper)<ContainerProps>`
  border: 1px solid ${MapBorder};
  background-color: ${MapBackground};
  cursor: grab;
  ${props =>
    props.isDragging &&
    css`
      border-width: 2px;
      border-style: dashed;
      background-color: transparent;
      cursor: grabbing;
      ${Header}, ${Body} {
        opacity: 0;
      }
    `}
`;

Container.defaultProps = {
  isElevated: false,
  hasPadding: false,
};

export const Title = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  color: ${MapContrastText};
`;

export const Labels = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

export const Label = styled.span`
  display: block;
  width: 17px;
  height: 17px;
  border-radius: ${radius()};
  background-color: red;
`;
