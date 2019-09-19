import React from 'react';

import { Container, Image } from './styles';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function Avatar(props: AvatarProps) {
  return (
    <Container>
      <Image {...props} />
    </Container>
  );
}
