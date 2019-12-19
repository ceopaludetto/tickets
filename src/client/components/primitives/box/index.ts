import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
import {
  compose,
  color,
  layout,
  space,
  typography,
  border,
  flexbox,
  shadow,
  ShadowProps,
  BorderProps,
  TypographyProps,
  ColorProps,
  LayoutProps,
  SpaceProps,
  FlexboxProps,
} from 'styled-system';

export const Box = styled('div', {
  shouldForwardProp,
})<
  Pick<ColorProps, 'bg' | 'backgroundColor' | 'opacity'> &
    LayoutProps &
    SpaceProps &
    TypographyProps &
    BorderProps &
    FlexboxProps &
    ShadowProps
>(compose(color, layout, space, typography, border, flexbox, shadow));
