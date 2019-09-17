export const CNPJ = [
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
];

export const Telefone = [
  '(',
  /[1-9]/,
  /[1-9]/,
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
];

export function MutableTelefone(userInput: string) {
  const numbers = userInput.match(/\d/g);
  let numberLength = 0;
  if (numbers) {
    numberLength = numbers.join('').length;
  }

  if (numberLength > 10) {
    return [
      '(',
      /[1-9]/,
      /[1-9]/,
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
    ];
  }
  return [
    '(',
    /[1-9]/,
    /[1-9]/,
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
  ];
}

export const CEP = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
