export function addMask(
  mask: (RegExp | string)[],
  replace: string,
  find: RegExp
) {
  return (val: string) => {
    let newVal = '';
    const parsed = (val.match(find) || []).join('');

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
    const parsed = value.replace(ignore, '');
    const chars = parsed.split('');

    if (parsed === '') {
      return '';
    }

    let result = '';
    let index = 0;
    while (chars.length) {
      const maskChar = mask[index];

      if (typeof maskChar !== 'undefined') {
        if (typeof maskChar === 'string') {
          result += maskChar;
        } else {
          const validChar = maskChar.test(chars[0]) ? chars.shift() : '';
          result += validChar;
        }
        index += 1;
      }
    }

    return result.substr(0, mask.length);
  };
}
