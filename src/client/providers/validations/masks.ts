const parseDigits = (v: string) => (v.match(/\d/g) || []).join('');

export function createFormatter(mask: (RegExp | string)[]) {
  return (value: string) => {
    const digits = parseDigits(value);
    const chars = digits.split('');

    let result = '';
    let index = 0;
    while (chars.length) {
      const maskChar = mask[index];

      if (typeof maskChar === 'string') {
        result += maskChar;
        index += 1;
      } else {
        const parsed = chars[0].match(maskChar) ? chars.shift() : '';
        result += parsed;
        index += 1;
      }
    }

    return result.substr(0, mask.length);
  };
}

export const celFormatter = createFormatter([
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]);

export const fixedFormatter = createFormatter([
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]);

export const cepFormatter = createFormatter([
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
]);

export const cnpjFormatter = createFormatter([
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
]);
