import styled, { css } from 'styled-components';

interface TextAlignProps {
  align?: 'left' | 'right' | 'center' | 'justify';
}

export const TextAlign = styled.div<TextAlignProps>`
  ${props => {
    const align = props.align || 'left';

    return css`
      text-align: ${align};
    `;
  }};
`;
