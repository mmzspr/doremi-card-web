import { type IKey, type Scale, scaleList } from '../types/types';

export default class Key {
  private readonly scale: Scale;
  private readonly octave: number;
  private readonly number: number; // scale + octave

  constructor(key: IKey) {
    this.scale = key.scale;
    this.octave = key.octave;
    this.number = scaleList.indexOf(this.scale) + this.octave * 10;
  }

  public getScale(): Scale {
    return this.scale;
  }

  public getOctave(): number {
    return this.octave;
  }

  public getString(): string {
    return this.scale + '/' + this.octave;
  }

  public getNumber(): number {
    return this.number;
  }

  public isSmaller(key: Key): boolean {
    return this.number < key.number;
  }
}
