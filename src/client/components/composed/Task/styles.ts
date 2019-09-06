import styled, { css } from 'styled-components';

import { Paper } from '@/client/components/layout';
import {
  MapBorder,
  MapBackground,
  MapContrastText,
} from '@/client/styles/maps';
import { radius } from '@/client/styles/utils';

export const Body = styled.div`
  padding: 1rem;
  border-top: 27px solid ${MapBorder};
`;

interface ContainerProps {
  isDragging?: boolean;
}

export const Container = styled(Paper)<ContainerProps>`
  border: 2px solid ${MapBorder};
  background-color: ${MapBackground};
  cursor: grab;
  ${props =>
    props.isDragging &&
    css`
      border-width: 2px;
      border-style: dashed;
      background-color: transparent;
      cursor: grabbing;
      ${Body} {
        opacity: 0;
      }
    `}
  & + ${Paper}{
    margin-top: 1rem;
  }
`;

Container.defaultProps = {
  isElevated: false,
  hasPadding: false,
};

export const Title = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${MapContrastText};
`;

export const Content = styled.div`
  color: ${MapContrastText};
  font-size: 1rem;
`;

export const Labels = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.75rem;
  margin-top: -1.5rem;
`;

interface LabelProps {
  color?: string;
}

export const Label = styled.span<LabelProps>`
  display: block;
  width: 17px;
  height: 17px;
  border-radius: ${radius()};
  ${props => css`
    background-color: ${props.color};
  `}
  & + span {
    margin-left: 0.5rem;
  }
`;
