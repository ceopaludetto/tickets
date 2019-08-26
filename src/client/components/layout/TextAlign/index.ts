import styled from 'styled-components';

interface TextAlignProps {
  align?: 'left' | 'right' | 'center' | 'justify';
}

export const TextAlign = styled.div<TextAlignProps>`
  text-align: ${props => {
    const align = props.align || 'left';

    return align;
  }};
`;
