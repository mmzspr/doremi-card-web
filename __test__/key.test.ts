import { describe, expect, test } from 'vitest';
import Key from '../src/class/key';
import { type Scale } from '../src/types/key';

// ========== Key ==========
describe('Key class', () => {
  const key = new Key({ scale: 'd', octave: 4 });

  test('getScale', () => {
    expect(key.scale).toBe('d');
  });

  test('getOctave', () => {
    expect(key.octave).toBe(4);
  });

  test('getString', () => {
    expect(key.string).toBe('d/4');
  });

  test('getNumber', () => {
    expect(key.number).toBe(41);
  });

  describe('isSmaller', () => {
    describe('[true]', () => {
      test.each([
        { scale: 'g', octave: 4 },
        { scale: 'a', octave: 4 },
        { scale: 'b', octave: 4 },
        { scale: 'c', octave: 5 },
        { scale: 'd', octave: 5 },
      ])('%o -> true', ({ scale, octave }) => {
        expect(key.isSmaller(new Key({ scale: scale as Scale, octave }))).toBe(
          true,
        );
      });
    });

    describe('[false]', () => {
      test.each([
        { scale: 'c', octave: 4 },
        { scale: 'b', octave: 3 },
        { scale: 'd', octave: 3 },
        { scale: 'b', octave: -1 },
        { scale: 'c', octave: -1 },
      ])('%o -> false', ({ scale, octave }) => {
        expect(key.isSmaller(new Key({ scale: scale as Scale, octave }))).toBe(
          false,
        );
      });
    });
  });
});
