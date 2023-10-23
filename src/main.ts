import './style.scss';
import { parseKey, generateRandomKey } from './utils';
import Score from './score';
import Key from './key';

let score: Score;

window.onload = () => {
  const lowerKey = new Key(parseKey('c/4'));
  const higherKey = new Key(parseKey('a/5'));

  const randomKey = generateRandomKey(lowerKey, higherKey);
  score = new Score("#output", randomKey.getString());
  console.log(score);
};
