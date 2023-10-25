export type Scale = 'c' | 'd' | 'e' | 'f' | 'g' | 'a' | 'b';
export type ItalianScale = 'ド' | 'レ' | 'ミ' | 'ファ' | 'ソ' | 'ラ' | 'シ';
export const scaleList: Scale[] = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
export const italianScaleList: ItalianScale[] = [
  'ド',
  'レ',
  'ミ',
  'ファ',
  'ソ',
  'ラ',
  'シ',
];

export interface IKey {
  scale: Scale;
  octave: number;
}
