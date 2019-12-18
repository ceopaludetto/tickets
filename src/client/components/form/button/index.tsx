import React, { cloneElement } from 'react';

import { Container, Icon, ButtonProps } from './styles';

export function Button({
  children,
  icon,
  iconPosition = 'before',
  size = 'medium',
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const mapSizeLineHeight = {
    small: 1.75,
    medium: 2.5,
    large: 3.5,
  };

  const mapSizeIcon = {
    small: 16,
    medium: 20,
    large: 24,
  };

  return (
    <Container
      borderRadius={6}
      fontSize={1}
      fontWeight={500}
      letterSpacing={1.5}
      border="none"
      lineHeight={mapSizeLineHeight[size]}
      px={size === 'medium' || size === 'large' ? 3 : 2}
      display="inline-flex"
      alignItems="center"
      variant={variant}
      {...rest}
    >
      {icon && (
        <Icon size={size} display="flex" variant={iconPosition}>
          {cloneElement(icon, {
            size: mapSizeIcon[size],
          })}
        </Icon>
      )}
      {children}
    </Container>
  );
}
