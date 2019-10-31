import { createFormatter, addMask } from '@/client/utils/masks';

interface CreateFormatterOptions {
  finder: RegExp;
  ignore: RegExp;
  replace: string;
}

export function createFormatterAndMask(
  mask: (string | RegExp)[],
  { finder, ignore, replace }: CreateFormatterOptions
) {
  return {
    formatter: createFormatter(mask, ignore),
    mask: addMask(mask, replace, finder),
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
  {
    finder: /\d/g,
    ignore: /(?!\d)./g,
    replace: '_',
  }
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
  {
    finder: /\d/g,
    ignore: /(?!\d)./g,
    replace: '_',
  }
);

export const cep = createFormatterAndMask(
  [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  {
    finder: /\d/g,
    ignore: /(?!\d)./g,
    replace: '_',
  }
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
  {
    finder: /\d/g,
    ignore: /(?!\d)./g,
    replace: '_',
  }
);
