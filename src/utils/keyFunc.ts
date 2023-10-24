import { type IKey, type Scale, scaleList } from '../types/key';
import { InvalidKeyError, UnexpectedArgumentError } from '../class/error';
import Key from '../class/key';

export function isValidKey(key: string): boolean {
  // example: a/10, g/-1, c/+2
  const regex = /^[a-g]\/[-+]?\d+$/;
  return regex.test(key);
}

export function parseKey(key: string): IKey {
  // error handling
  if (!isValidKey(key)) {
    throw new InvalidKeyError('[Error] invalid key');
  }

  const [scale, octave] = key.split('/');

  const result: IKey = {
    scale: scale as Scale,
    octave: Number(octave),
  };
  return result;
}

export function generateRandomKey(lowerKey: Key, higherKey: Key): Key {
  // error handling
  if (higherKey.isSmaller(lowerKey)) {
    throw new UnexpectedArgumentError(
      '[Error] first argument key must be lower than second argument key',
    );
  }

  // generate random key
  const result: Key = (function () {
    // example of lengthOfKeyInRange: (4/c, 4/b) → 7, (a/4, d/5) → 4
    const lengthOfKeysInRange =
      higherKey.number -
      lowerKey.number +
      1 -
      3 * (higherKey.octave - lowerKey.octave);

    // get one value from lengthOfKeysInRange
    const randomKeyIndex = Math.floor(Math.random() * lengthOfKeysInRange);
    const lowerKeyIndex = scaleList.indexOf(lowerKey.scale);
    // lengthOfKeysInRange to scale, octave
    const randomScale = scaleList[(lowerKeyIndex + randomKeyIndex) % 7];
    const randomOctave =
      Math.floor((lowerKeyIndex + randomKeyIndex) / 7) + lowerKey.octave;

    return new Key({ scale: randomScale, octave: randomOctave });
  })();

  return result;
}
