import './style.scss';
import { parseKey, generateRandomKey } from './utils';
import { drawScore } from './drawScore';
import Key from './key';

window.onload = () => {
  const lowerKey = new Key(parseKey('c/4'));
  const higherKey = new Key(parseKey('a/5'));

  const randomKey = generateRandomKey(lowerKey, higherKey);
  drawScore(randomKey.getString());
};
