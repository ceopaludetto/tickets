import { addMask, createFormatter } from './masks';

describe('addMask', () => {
  it('should map mask correctly without a value', () => {
    const masked = addMask(
      ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/],
      '_',
      /\d/g
    );

    expect(masked('')).toBe('');
  });

  it('should map mask correctly with value', () => {
    const masked = addMask(
      ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/],
      '_',
      /\d/g
    );

    expect(masked('(11)')).toBe('(11) ___');
  });
});

describe('createFormatter', () => {
  it("should dont't add format to a empty string", () => {
    const format = createFormatter(
      ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/],
      /\d/g
    );

    expect(format('')).toBe('');
  });

  it('should add format to common string', () => {
    const format = createFormatter(
      ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/],
      /\d/g
    );

    expect(format('119')).toBe('(11) 9');
  });
});
