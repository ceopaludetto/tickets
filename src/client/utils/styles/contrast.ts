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
  const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

  if (yiq >= 150) {
    return returnDark;
  }

  return returnLight;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getContrastText<T extends any>(path: string, darkColor = '#000', lightColor = '#FFF') {
  return (props: T) => {
    if (typeof props[path] !== 'undefined') {
      return colorYIQ(props[path], darkColor, lightColor);
    }

    if (path && path.indexOf('.') > 0) {
      const paths = path.split('.');
      const { length } = paths;
      let object = props[paths[0]];
      let index = 1;

      while (object != null && index < length) {
        object = object[paths[index]];
        index += 1;
      }

      if (typeof object !== 'undefined') {
        return colorYIQ(object, darkColor, lightColor);
      }
    }

    return darkColor;
  };
}
