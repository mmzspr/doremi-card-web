export type Scale = 'c' | 'd' | 'e' | 'f' | 'g' | 'a' | 'b';
export const scaleList: Scale[] = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

export interface IKey {
  scale: Scale;
  octave: number;
}
