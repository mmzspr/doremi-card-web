import * as Tone from 'tone';
import { parseKey } from '../utils/keyFunc';
import { scaleList } from '../types/key';
import Key from './key';

type Urls = Record<string, string>;

export default class Sound {
  private readonly _sampler: Tone.Sampler;

  constructor(lowerKeyStr: string, higherKeyStr: string) {
    const urls = this._generateUrls(
      new Key(parseKey(lowerKeyStr)),
      new Key(parseKey(higherKeyStr)),
    );
    this._sampler = new Tone.Sampler({
      urls,
      release: 1,
      baseUrl: './sounds/piano/',
    }).toDestination();
  }

  private _generateUrls(lowerKey: Key, higherKey: Key): Urls {
    const lengthOfKeysInRange =
      higherKey.number -
      lowerKey.number +
      1 -
      3 * (higherKey.octave - lowerKey.octave);
    const result: Urls = {};

    for (let i = 0; i < lengthOfKeysInRange; i++) {
      const scale = scaleList[(lowerKey.number + i) % 7];
      const octave = lowerKey.octave + Math.floor(i / 7);
      const key = new Key({
        scale,
        octave,
      });
      const name = key.string.toUpperCase().replace('/', '');
      result[name] = `${name}.mp3`;
    }

    return result;
  }

  public play(key: string): void {
    const name = key.replace('/', '');
    this._sampler.triggerAttackRelease([name], 1);
  }
}
