import { describe, expect, test } from 'vitest';
import { isValidKey, parseKey, generateRandomKey } from '../src/utils/keyFunc';
import Key from '../src/class/key';
import { InvalidKeyError, UnexpectedArgumentError } from '../src/class/error';

// ================================
//           isValidKey
// ================================
describe('isValidKey', () => {
  describe('[true]', () => {
    test.each([
      'a/4', // a ~ g
      'b/4',
      'c/4',
      'd/4',
      'e/4',
      'f/4',
      'g/4',
      'a/10', // more than 4
      'a/0', // zero
      'a/-1', // minus
      'a/+4', // plus
    ])('%s -> true', (keystr) => {
      expect(isValidKey(keystr)).toBe(true);
    });
  });

  describe('[false]', () => {
    test.each([
      '', // invalid format
      'a',
      'h/4', // more than g
      'i/4',
      '0/4', // undefined scale
      '/4',
      'a/', // undefined octave
      'a/1.5',
      'a/a',
      'a//2',
    ])('%s -> false', (keystr) => {
      expect(isValidKey(keystr)).toBe(false);
    });
  });
});

// ================================
//           parseKey
// ================================
describe('parseKey', () => {
  describe('[normal]', () => {
    test.each([
      { keystr: 'a/4', expected: { scale: 'a', octave: 4 } }, // a ~ g
      { keystr: 'b/4', expected: { scale: 'b', octave: 4 } },
      { keystr: 'c/4', expected: { scale: 'c', octave: 4 } },
      { keystr: 'd/4', expected: { scale: 'd', octave: 4 } },
      { keystr: 'e/4', expected: { scale: 'e', octave: 4 } },
      { keystr: 'f/4', expected: { scale: 'f', octave: 4 } },
      { keystr: 'g/4', expected: { scale: 'g', octave: 4 } },
      { keystr: 'a/10', expected: { scale: 'a', octave: 10 } }, // more than 4
      { keystr: 'a/0', expected: { scale: 'a', octave: 0 } }, // zero
      { keystr: 'a/-1', expected: { scale: 'a', octave: -1 } }, // minus
      { keystr: 'a/+4', expected: { scale: 'a', octave: 4 } }, // plus
    ])('$keystr -> $expected', ({ keystr, expected }) => {
      expect(parseKey(keystr)).toStrictEqual(expected);
    });
  });

  describe('[error]', () => {
    test.each([
      '', // invalid format
      'a',
      'h/4', // more than g
      'i/4',
      '0/4', // undefined scale
      '/4',
      'a/', // undefined octave
      'a/1.5',
      'a/a',
      'a//2',
    ])('%s -> InvalidKeyError("[Error] invalid key")', (keystr) => {
      expect(() => parseKey(keystr)).toThrowError(
        new InvalidKeyError('[Error] invalid key'),
      );
    });
  });
});

// ================================
//        generateRandomKey
// ================================
describe('generateRandomKey', () => {
  describe('[normal]', () => {
    test.each([
      ['c/4', 'c/4'],
      ['b/3', 'c/4'],
      ['c/4', 'b/4'],
      ['c/-1', 'b/-1'],
      ['a/-1', 'd/0'],
      ['c/0', 'b/0'],
      ['a/0', 'd/1'],
    ])('(%s, %s)', (lowerKeyStr, higherKeyStr) => {
      const lowerKey = new Key(parseKey(lowerKeyStr));
      const higherKey = new Key(parseKey(higherKeyStr));

      const randomKey = generateRandomKey(lowerKey, higherKey);
      expect(isValidKey(randomKey.string)).toBe(true);
      expect(randomKey.number).toBeGreaterThanOrEqual(
        lowerKey.number,
      );
      expect(randomKey.number).toBeLessThanOrEqual(higherKey.number);
    });
  });

  describe('[error]', () => {
    describe('when first argument > second argument', () => {
      test.each([['d/4', 'c/4']])('(%s, %s)', (lowerKeyStr, higherKeyStr) => {
        const lowerKey = new Key(parseKey(lowerKeyStr));
        const higherKey = new Key(parseKey(higherKeyStr));
        expect(() => generateRandomKey(lowerKey, higherKey)).toThrowError(
          new UnexpectedArgumentError(
            '[Error] first argument key must be lower than second argument key',
          ),
        );
      });
    });
  });
});
