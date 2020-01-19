import { parseToRgb, darken, rgbToColorString } from 'polished';
import { RgbColor, RgbaColor } from 'polished/lib/types/color';
import { withProp, theme } from 'styled-tools';

import { ThemeType, ColorType } from './styles.dto';

function convertColor(color: string | RgbColor | RgbaColor) {
  let curr: RgbaColor | RgbColor = { red: 0, green: 0, blue: 0 };
  if (typeof color === 'string') {
    curr = parseToRgb(color);
  } else {
    curr = color;
  }

  return curr;
}

export function colorYIQ(color: string | RgbColor | RgbaColor, isDark: string, isLight: string) {
  const curr = convertColor(color);
  const yiq = (curr.red * 299 + curr.green * 587 + curr.blue * 114) / 1000;
  if (yiq >= 150) {
    return isDark;
  }

  return isLight;
}

export function getShadows(color: string | RgbColor | RgbaColor) {
  const curr = convertColor(color);

  let shadows: string[] = [];
  for (let i = 1; i <= 10; i += 1) {
    shadows = [
      ...shadows,
      rgbToColorString({
        ...curr,
        alpha: i / 10,
      }),
    ];
  }

  return shadows;
}

export function getColors(colors: ColorType, currTheme: ThemeType) {
  const currentColors = colors[currTheme];
  let res = {};

  Object.keys(currentColors).forEach(k => {
    const color = currentColors[k];
    res = {
      ...res,
      [k]: {
        main: color,
        hover: darken(0.025, color),
        active: darken(0.05, color),
        contrast: colorYIQ(color, '#000', '#FFF'),
        shadows: [...getShadows(color)],
      },
    };
  });

  return res;
}

export function getThemeColor(value: string, customProp = 'color') {
  return withProp(customProp, p => theme(`colors.${p}.${value}`));
}
