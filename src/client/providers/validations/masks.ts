const parseDigits = (v: string, reg: RegExp) => (v.match(reg) || []).join('');

export function addMask(
  mask: (RegExp | string)[],
  replace: string,
  ignore: RegExp
) {
  return (val: string) => {
    let newVal = '';
    const parsed = parseDigits(val, ignore);

    if (!parsed) {
      return '';
    }

    for (let i = 0; i < mask.length; i += 1) {
      if (typeof mask[i] === 'string') {
        newVal += mask[i];
      } else if (val[i]) {
        newVal += val[i];
      } else {
        newVal += replace;
      }
    }

    return newVal;
  };
}

export function createFormatter(mask: (RegExp | string)[], ignore: RegExp) {
  return (value: string) => {
    const digits = parseDigits(value, ignore);
    const chars = digits.split('');

    let result = '';
    let index = 0;
    while (chars.length) {
      const maskChar = mask[index];

      if (typeof maskChar === 'string') {
        result += maskChar;
        index += 1;
      } else {
        const parsed = maskChar.test(chars[0]) ? chars.shift() : '';
        result += parsed;
        index += 1;
      }
    }

    return result.substr(0, mask.length);
  };
}

export function createFormatterAndMask(
  mask: (string | RegExp)[],
  ignore: RegExp,
  replace: string
) {
  return {
    formatter: createFormatter(mask, ignore),
    mask: addMask(mask, replace, ignore),
  };
}

export const cel = createFormatterAndMask(
  [
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
  ],
  /\d/g,
  '_'
);

export const fixed = createFormatterAndMask(
  [
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
  ],
  /\d/g,
  '_'
);

export const cep = createFormatterAndMask(
  [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  /\d/g,
  '_'
);

export const cnpj = createFormatterAndMask(
  [
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
  ],
  /\d/g,
  '_'
);
