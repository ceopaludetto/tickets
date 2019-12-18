import { parseToRgb, rgba } from 'polished';

export function toRGBA(color: string, opacity: number) {
  const { red, green, blue } = parseToRgb(color);

  return rgba(red, green, blue, opacity);
}
