import { parseToRgb } from 'polished';
import { RgbColor } from 'polished/lib/types/color';

export function colorYIQ(color: string | RgbColor, returnDark = '#000', returnLight = '#FFF') {
  let c: RgbColor | null;

  if (typeof color === 'string') {
    c = parseToRgb(color);
  } else {
    c = color;
  }

  const { red, green, blue } = c;
  const yiq = (red * 299 + green * 587 + blue * 114) / 100;

  if (yiq >= 150) {
    return returnDark;
  }

  return returnLight;
}
