const replaceInverse = (val: string, reg: RegExp) => val.replace(reg, '');

export function telMask(val: string) {
  const parsed = replaceInverse(val, /(?!\d)./g);
  if (parsed.length >= 11) {
    return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  }

  return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
}

export const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
