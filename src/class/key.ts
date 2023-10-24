import { type IKey, type Scale, scaleList } from '../types/key';

export default class Key {
  private readonly _scale: Scale;
  private readonly _octave: number;
  private readonly _number: number; // scale + octave

  constructor(key: IKey) {
    this._scale = key.scale;
    this._octave = key.octave;
    this._number = scaleList.indexOf(this._scale) + this._octave * 10;
  }

  public get scale(): Scale {
    return this._scale;
  }

  public get octave(): number {
    return this._octave;
  }

  public get string(): string {
    return this._scale + '/' + this._octave;
  }

  public get number(): number {
    return this._number;
  }

  public isSmaller(key: Key): boolean {
    return this._number < key.number;
  }
}
